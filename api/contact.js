// Serverless endpoint for the Contact Us form on Vercel.
// Sends messages via Resend if RESEND_API_KEY is configured.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, bestTime, message, _gotcha } = req.body || {};

    // 1. Honeypot check for bots
    if (_gotcha) {
      return res.status(200).json({ success: true, note: 'ok' });
    }

    // 2. Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // 3. Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const recipient = process.env.CONTACT_TO_EMAIL || 'info@genesis-garden.org';
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn('RESEND_API_KEY not configured. Logging contact form submission:', {
        name,
        email,
        phone,
        bestTime,
        message,
      });
      return res.status(200).json({
        success: true,
        mocked: true,
        message: 'Message received (RESEND_API_KEY not configured).',
      });
    }

    // 4. Send via Resend
    const emailBody = `
New message from Genesis Garden website contact form:

Name: ${name}
Email: ${email}
Phone: ${phone || '(not provided)'}
Best time to reach: ${bestTime || '(not specified)'}

Message:
${message}
    `.trim();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Genesis Garden Form <onboarding@resend.dev>',
        to: recipient,
        reply_to: email,
        subject: `Website contact form: ${name}`,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Resend API error:', errData);
      return res.status(500).json({ error: 'Failed to send message. Please try again or call us.' });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

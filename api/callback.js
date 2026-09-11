// Step 2 of Decap CMS's GitHub OAuth flow: GitHub redirects here with a
// short-lived ?code=. We exchange it server-side for an access token (the
// client secret never reaches the browser) and hand the token back to the
// Decap popup via postMessage, matching the protocol Decap's GitHub
// backend expects from a "netlify-cms-style" OAuth provider.
export default async function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  const { code, error, error_description: errorDescription } = req.query;

  if (!clientId || !clientSecret) {
    res.status(500).send('Missing GITHUB_OAUTH_CLIENT_ID / GITHUB_OAUTH_CLIENT_SECRET environment variables');
    return;
  }

  if (error) {
    res.status(400).send(renderMessage('error', JSON.stringify({ error, error_description: errorDescription })));
    return;
  }

  if (!code) {
    res.status(400).send('Missing code parameter');
    return;
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      res.status(400).send(renderMessage('error', JSON.stringify(tokenData)));
      return;
    }

    const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });
    res.status(200).send(renderMessage('success', payload));
  } catch (err) {
    res.status(500).send(renderMessage('error', JSON.stringify({ error: 'token_exchange_failed', error_description: err.message })));
  }
}

// Decap listens for a "authorizing:github" handshake message, then a
// message beginning with "authorization:github:success:" or ":error:"
// carrying the JSON payload, sent from a popup back to its opener.
function renderMessage(status, payload) {
  return `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        function receiveMessage(message) {
          window.opener.postMessage(
            'authorization:github:${status}:${payload.replace(/'/g, "\\'")}',
            message.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;
}

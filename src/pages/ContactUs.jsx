import { useState, useEffect, useRef } from 'react';
import SEOHead from '../components/SEOHead';
import SafetyStrip from '../components/SafetyStrip';
import PhoneIcon from '../components/PhoneIcon';
import useInView from '../hooks/useInView';
import content from '../content/contact.json';
import site from '../content/site.json';
import './ContactUs.css';

const CONFETTI_COLORS = ['#52b788', '#2d6a4f', '#d4a373', '#e8d5b7', '#40916c'];

const CONFETTI_PIECES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 + (i % 2) * 0.3;
  const distance = 70 + (i % 4) * 20;
  return {
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 20,
    rotate: (i % 2 === 0 ? 1 : -1) * (120 + i * 15),
    delay: (i % 5) * 0.04,
  };
});

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bestTime: '',
    message: '',
    _gotcha: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'submitted' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [gridRef, gridInView] = useInView();
  const successHeadingRef = useRef(null);
  const errorHeadingRef = useRef(null);

  // Move focus to the confirmation or error so screen reader and keyboard users land on it
  useEffect(() => {
    if (status === 'submitted') successHeadingRef.current?.focus();
    if (status === 'error') errorHeadingRef.current?.focus();
  }, [status]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Unable to send your message right now.');
      }

      setStatus('submitted');
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(
        err.message || 'There was a problem sending your message. Please give us a call directly.'
      );
    }
  }

  return (
    <>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">{content.hero.heading}</h1>
          <p className="animate-fade-in-up delay-1">
            {content.hero.text}
          </p>
        </div>
      </section>

      {/* Safety & Crisis Strip */}
      <SafetyStrip />

      {/* Contact Grid */}
      <section className="section" ref={gridRef}>
        <div className="container">
          <div className={`contact-grid${gridInView ? ' contact-grid--visible' : ''}`}>
            {/* Form Column (placed first on mobile for immediate conversion) */}
            <div className="contact-form-wrapper">
              {/* Quick phone banner above the form */}
              <div className="contact-quick-call">
                <div className="contact-quick-call__icon" aria-hidden="true">
                  <PhoneIcon size={22} />
                </div>
                <div className="contact-quick-call__content">
                  <p className="contact-quick-call__title">Need immediate help or shelter?</p>
                  <p className="contact-quick-call__text">
                    Calling is fastest:{' '}
                    <a href={site.phoneHref} className="contact-quick-call__link">
                      {site.phone}
                    </a>
                    {site.callHours ? ` · ${site.callHours}` : ''}
                  </p>
                </div>
              </div>

              <h2>{content.form.heading}</h2>

              {status === 'error' && (
                <div className="contact-form__error" role="alert">
                  <h3 ref={errorHeadingRef} tabIndex={-1}>Message Not Sent</h3>
                  <p>{errorMessage}</p>
                  <p>
                    You can reach us directly by calling{' '}
                    <a href={site.phoneHref} className="contact-link">{site.phone}</a> or emailing{' '}
                    <a href={`mailto:${site.email}`} className="contact-link">{site.email}</a>.
                  </p>
                </div>
              )}

              {status === 'submitted' ? (
                <div className="contact-form__success">
                  {CONFETTI_PIECES.map((piece) => (
                    <span
                      key={piece.id}
                      className="contact-form__confetti"
                      aria-hidden="true"
                      style={{
                        background: piece.color,
                        animationDelay: `${piece.delay}s`,
                        '--confetti-x': `${piece.x}px`,
                        '--confetti-y': `${piece.y}px`,
                        '--confetti-rotate': `${piece.rotate}deg`,
                      }}
                    />
                  ))}
                  <div className="contact-form__success-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 ref={successHeadingRef} tabIndex={-1}>Thank You!</h3>
                  <p>Your message has been received. Our team will review it and get in touch with you shortly.</p>
                  <p>
                    Need immediate assistance? Call us at{' '}
                    <a href={site.phoneHref} className="contact-link">{site.phone}</a>.
                  </p>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        bestTime: '',
                        message: '',
                        _gotcha: '',
                      });
                    }}
                  >
                    Write Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <p className="contact-form__required-note">
                    Required fields are marked <span aria-hidden="true">*</span>
                    <span className="sr-only">with an asterisk</span>
                  </p>

                  {/* Honeypot field for bot suppression */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="contact-form__group">
                    <label htmlFor="contact-name" className="contact-form__label">
                      Full Name <span className="contact-form__required" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="contact-form__input"
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label htmlFor="contact-email" className="contact-form__label">
                        Email Address <span className="contact-form__required" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="contact-form__group">
                      <label htmlFor="contact-phone" className="contact-form__label">
                        Phone Number <span className="contact-form__optional">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="(309) 000-0000"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="contact-best-time" className="contact-form__label">
                      Best Time to Reach You <span className="contact-form__optional">(optional)</span>
                    </label>
                    <select
                      id="contact-best-time"
                      name="bestTime"
                      value={formData.bestTime}
                      onChange={handleChange}
                      className="contact-form__input contact-form__select"
                    >
                      <option value="">Anytime</option>
                      <option value="Morning">Morning (8am – 12pm)</option>
                      <option value="Afternoon">Afternoon (12pm – 5pm)</option>
                      <option value="Evening">Evening (5pm – 8pm)</option>
                    </select>
                  </div>

                  <div className="contact-form__group">
                    <label htmlFor="contact-message" className="contact-form__label">
                      Message <span className="contact-form__required" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="contact-form__textarea"
                      placeholder="How can we help you?"
                      rows="5"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary btn--lg contact-form__submit"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Info Column */}
            <div className="contact-info">
              <div className="contact-info__card glass-card">
                <div className="contact-info__icon icon-container" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h2>{content.cards.mailingHeading}</h2>
                <address>
                  <p>{site.address.street}</p>
                  <p>{site.address.cityStateZip}</p>
                </address>
              </div>

              <div className="contact-info__card glass-card">
                <div className="contact-info__icon icon-container" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <h2>{content.cards.callHeading}</h2>
                <p>
                  <a href={site.phoneHref} className="contact-link">{site.phone}</a>
                </p>
              </div>

              <div className="contact-info__card glass-card">
                <div className="contact-info__icon icon-container" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h2>{content.cards.emailHeading}</h2>
                <p>
                  <a href={`mailto:${site.email}`} className="contact-link">{site.email}</a>
                </p>
              </div>

              <div className="contact-info__card contact-info__card--emergency glass-card">
                <div className="contact-info__icon icon-container contact-info__icon--emergency" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h2>{content.cards.emergencyHeading}</h2>
                <p>
                  <a href={site.phoneHref} className="contact-link">{site.phone}</a>
                </p>
                <p className="contact-info__note">
                  {content.cards.emergencyNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contact-map">
        <iframe
          title="Genesis Garden Location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.address.street}, ${site.address.cityStateZip}`)}&output=embed`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}

export default ContactUs;

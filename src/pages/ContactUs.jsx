import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import useInView from '../hooks/useInView';
import content from '../content/contact.json';
import site from '../content/site.json';
import './ContactUs.css';

const ICONS = {
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [gridRef, gridInView] = useInView();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name} via genesisgarden.org`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
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

      {/* Primary Actions — call/text/email, always work, no form required */}
      <div className="container">
        <div className="contact-actions">
          <a href={site.phoneHref} className="btn btn--primary btn--lg contact-actions__btn">
            {ICONS.phone} Call {site.phone}
          </a>
          <a href={`sms:${site.phone.replace(/-/g, '')}`} className="btn btn--outline btn--lg contact-actions__btn">
            {ICONS.chat} Text Us
          </a>
          <a href={`mailto:${site.email}`} className="btn btn--accent btn--lg contact-actions__btn">
            {ICONS.mail} Email Us
          </a>
        </div>
      </div>

      {/* Contact Grid */}
      <section className="section" ref={gridRef}>
        <div className="container">
          <div className={`contact-grid${gridInView ? ' contact-grid--visible' : ''}`}>
            {/* Info Column */}
            <div className="contact-info">
              <div className="contact-info__card glass-card">
                <div className="contact-info__icon icon-container" aria-hidden="true">
                  {ICONS.location}
                </div>
                <h2>{content.cards.mailingHeading}</h2>
                <address>
                  <p>{site.address.street}</p>
                  <p>{site.address.cityStateZip}</p>
                </address>
              </div>

              <div className="contact-info__card glass-card">
                <div className="contact-info__icon icon-container" aria-hidden="true">
                  {ICONS.phone}
                </div>
                <h2>{content.cards.callHeading}</h2>
                <p>
                  <a href={site.phoneHref} className="contact-link">{site.phone}</a>
                </p>
              </div>

              <div className="contact-info__card glass-card">
                <div className="contact-info__icon icon-container" aria-hidden="true">
                  {ICONS.mail}
                </div>
                <h2>{content.cards.emailHeading}</h2>
                <p>
                  <a href={`mailto:${site.email}`} className="contact-link">{site.email}</a>
                </p>
                <p className="contact-info__note">
                  {content.cards.emailNote}
                </p>
              </div>

              <div className="contact-info__card contact-info__card--emergency glass-card">
                <div className="contact-info__icon icon-container contact-info__icon--emergency" aria-hidden="true">
                  {ICONS.alert}
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

            {/* Form Column */}
            <div className="contact-form-wrapper">
              <h2>{content.form.heading}</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__group">
                  <label htmlFor="contact-name" className="contact-form__label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="contact-form__input"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="contact-email" className="contact-form__label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-form__input"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="contact-message" className="contact-form__label">
                    Message
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
                <button type="submit" className="btn btn--primary btn--lg contact-form__submit">
                  Send Message
                </button>
                <p className="contact-form__hint">
                  This opens your email app with your message pre-filled — nothing sends until you hit send there.
                </p>
              </form>
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

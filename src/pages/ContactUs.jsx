import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import useInView from '../hooks/useInView';
import './ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [gridRef, gridInView] = useInView();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <SEOHead
        title="Contact Us | Genesis Garden"
        description="Contact Genesis Garden by calling or texting 309-326-3075, or by mail at 307 E Carroll St, Macomb, IL 61455."
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">Contact Us</h1>
          <p className="animate-fade-in-up delay-1">
            We'd love to hear from you. Reach out with questions, or if you need housing assistance.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section" ref={gridRef}>
        <div className="container">
          <div className={`contact-grid${gridInView ? ' contact-grid--visible' : ''}`}>
            {/* Info Column */}
            <div className="contact-info">
              <div className="contact-info__card glass-card">
                <div className="contact-info__icon icon-container" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h2>Mailing Address</h2>
                <address>
                  <p>307 E Carroll St</p>
                  <p>Macomb, IL 61455</p>
                </address>
              </div>

              <div className="contact-info__card contact-info__card--emergency glass-card">
                <div className="contact-info__icon icon-container contact-info__icon--emergency" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <h2>Call or Text Us</h2>
                <p>
                  <a href="tel:3093263075" className="contact-link">309-326-3075</a>
                </p>
                <p className="contact-info__note">
                  Please leave a message if we can't answer the phone, and we will call or text you in response.
                </p>
              </div>

              <div className="contact-info__card glass-card">
                <div className="contact-info__icon icon-container" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h2>Email</h2>
                <p>
                  <a href="mailto:info@genesis-garden.org" className="contact-link">info@genesis-garden.org</a>
                </p>
                <p className="contact-info__note">
                  Not listed on the main Contact page, but published by Genesis Garden in its SMS
                  messaging terms as a way to reach the organization.
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              {submitted ? (
                <div className="contact-form__success">
                  <div className="contact-form__success-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your message has been received. We'll get back to you as soon as possible.</p>
                  <button
                    className="btn btn--primary"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
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
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contact-map">
        <iframe
          title="Genesis Garden Location"
          src="https://www.google.com/maps?q=307+E+Carroll+St,+Macomb,+IL+61455&output=embed"
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

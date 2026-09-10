import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import site from '../content/site.json';
import './Footer.css';

const footerLinks = {
  services: [
    { to: '/housing-services', label: 'Housing' },
    { to: '/job-openings', label: 'Job Openings' },
    { to: '/summer-meals', label: 'Summer Meals To-Go' },
    { to: '/about-us', label: 'About Us' },
    { to: '/partners', label: 'Partners' },
  ],
  support: [
    { to: '/donate', label: 'Donate' },
    { to: '/contact-us', label: 'Contact Us' },
    { href: 'https://www.genesis-garden.org/privacy-policy/', label: 'Privacy Policy', external: true },
  ],
};

function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerRef, footerInView] = useInView({ threshold: 0.1 });

  return (
    <footer className="footer" role="contentinfo">
      {/* Gradient Border Top */}
      <div className="footer__gradient-border" aria-hidden="true" />

      <div className="footer__main container" ref={footerRef}>
        <div className={`footer__grid${footerInView ? ' footer__grid--visible' : ''}`}>
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Genesis Garden Home">
              <img
                src="/logo/Logo-Full.png"
                alt=""
                className="footer__logo-img"
                width="187"
                height="200"
                loading="lazy"
              />
              <span className="footer__logo-text">{site.orgName}</span>
            </Link>
            <p className="footer__tagline">
              {site.tagline}
            </p>
            <div className="footer__social">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Visit Genesis Garden on Facebook"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__links-group">
            <h3 className="footer__heading">Our Work</h3>
            <ul className="footer__link-list">
              {footerLinks.services.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer__links-group">
            <h3 className="footer__heading">Support</h3>
            <ul className="footer__link-list">
              {footerLinks.support.map((link) => (
                <li key={link.to || link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer__link">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.to} className="footer__link">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer__contact">
            <h3 className="footer__heading">Contact</h3>
            <address className="footer__address">
              <p>{site.address.street}</p>
              <p>{site.address.cityStateZip}</p>
              <p>
                <a href={site.phoneHref} className="footer__link">{site.phone}</a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="footer__link">{site.email}</a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="footer__cta-strip">
        <div className="container footer__cta-inner">
          <p className="footer__cta-text">
            Help us provide safe, stable housing for families in need.
          </p>
          <Link to="/donate" className="btn btn--accent btn--sm">
            Support Our Mission
          </Link>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {currentYear} {site.orgName}. All rights reserved.</p>
          <p className="footer__501">A 501(c)(3) nonprofit organization</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

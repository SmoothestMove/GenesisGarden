import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import nav from '../content/nav.json';
import './Header.css';

const navLinks = nav.header;
const MOBILE_QUERY = '(max-width: 1023px)';
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  const navListRef = useRef(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Position the sliding active-link indicator (desktop nav only)
  useEffect(() => {
    function measure() {
      const list = navListRef.current;
      if (!list) return;
      const active = list.querySelector('.header__nav-link--active');
      if (!active) {
        setIndicator(null);
        return;
      }
      const listRect = list.getBoundingClientRect();
      const linkRect = active.getBoundingClientRect();
      setIndicator({ left: linkRect.left - listRect.left, width: linkRect.width });
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [pathname]);

  // Track whether the nav is rendered as the mobile drawer
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setMenuOpen(false);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Modal drawer behavior: focus first link, trap Tab, close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const navEl = navRef.current;
    const toggle = toggleRef.current;
    navEl?.querySelector(FOCUSABLE)?.focus();

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggle?.focus();
        return;
      }
      if (e.key !== 'Tab' || !navEl) return;
      const items = [...navEl.querySelectorAll(FOCUSABLE), toggle].filter(Boolean);
      const index = items.indexOf(document.activeElement);
      const next = e.shiftKey
        ? (index <= 0 ? items.length - 1 : index - 1)
        : (index === -1 || index === items.length - 1 ? 0 : index + 1);
      e.preventDefault();
      items[next].focus();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const drawerOpen = isMobile && menuOpen;

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`} role="banner">
      <div className="header__inner container">
        <Link to="/" className="header__logo" aria-label="Genesis Garden Home">
          <img
            src="/logo/Logo-Hybrid.png"
            alt=""
            className="header__logo-img"
            width="164"
            height="176"
          />
          <span className="header__logo-text">
            Genesis<span className="header__logo-text-accent"> Garden</span>
          </span>
        </Link>

        <nav
          ref={navRef}
          id="primary-navigation"
          className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
          aria-label="Main navigation"
          role={drawerOpen ? 'dialog' : undefined}
          aria-modal={drawerOpen ? 'true' : undefined}
          inert={isMobile && !menuOpen}
        >
          <ul className="header__nav-list" ref={navListRef}>
            {indicator && (
              <span
                className="header__nav-indicator"
                aria-hidden="true"
                style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
              />
            )}
            {navLinks.map((link) => (
              <li key={link.to} className="header__nav-item">
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `header__nav-link${isActive ? ' header__nav-link--active' : ''}`}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile-only donate button inside nav */}
          <div className="header__nav-cta">
            <Link to="/donate" className="btn btn--accent btn--lg header__nav-donate">
              Donate Now
            </Link>
          </div>
        </nav>

        <div className="header__actions">
          <Link to="/donate" className="btn btn--accent header__donate-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Donate
          </Link>
          <button
            ref={toggleRef}
            className={`header__hamburger${menuOpen ? ' header__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="header__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Header;

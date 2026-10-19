import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import './DonationPrompt.css';

const SESSION_KEY = 'gg-donation-prompt-dismissed';
const SCROLL_THRESHOLD = 0.45;
const TIME_THRESHOLD_MS = 20000;
const DESKTOP_QUERY = '(min-width: 768px)';

function rememberDismissed() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // sessionStorage unavailable (private mode etc.) — fine to skip
  }
}

/**
 * A single, dismissible, once-per-session prompt toward Donate.
 * Desktop only (audit finding 1): on phones it covered the hero buttons,
 * so mobile gets the inline <InlineDonateBanner /> instead.
 * Non-modal — a thin strip that triggers after the user has scrolled partway
 * down the page or spent a while on it, and steps aside whenever the footer
 * (with its own donate action) is on screen.
 */
function DonationPrompt() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [visible, setVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const shownRef = useRef(false);

  // Arm the scroll/time triggers (desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    function show() {
      if (shownRef.current) return;
      shownRef.current = true;
      setVisible(true);
    }

    function onScroll() {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_THRESHOLD) show();
    }

    const timer = setTimeout(show, TIME_THRESHOLD_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isDesktop]);

  // Never cover the footer's own actions
  useEffect(() => {
    if (!visible) return;
    const footer = document.querySelector('.footer');
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => {
      setFooterInView(entry.isIntersecting);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, [visible]);

  // Escape dismisses
  useEffect(() => {
    if (!visible) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setVisible(false);
        rememberDismissed();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  function dismiss() {
    setVisible(false);
    rememberDismissed();
  }

  if (!isDesktop || !visible) return null;

  return (
    <aside
      className={`donation-prompt${footerInView ? ' donation-prompt--hidden' : ''}`}
      aria-label="Donation reminder"
      inert={footerInView}
    >
      <p className="donation-prompt__text">
        Help a family find stable housing today.
      </p>
      <Link to="/donate" className="btn btn--accent donation-prompt__btn" onClick={dismiss}>
        Donate Now
      </Link>
      <button
        type="button"
        className="donation-prompt__close"
        onClick={dismiss}
        aria-label="Dismiss donation reminder"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </aside>
  );
}

export default DonationPrompt;

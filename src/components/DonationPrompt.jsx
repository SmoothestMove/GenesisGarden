import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import site from '../content/site.json';
import './DonationPrompt.css';

const SESSION_KEY = 'gg-donation-prompt-dismissed';
const SCROLL_THRESHOLD = 0.45;
const TIME_THRESHOLD_MS = 20000;

/**
 * A single, dismissible, once-per-session prompt toward Donate.
 * Non-modal (doesn't block or trap focus) — triggers after the user has
 * scrolled partway down the page or spent a while on it, whichever first.
 */
function DonationPrompt() {
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!visible) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') dismiss();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage unavailable (private mode etc.) — fine to skip
    }
  }

  if (!visible) return null;

  return (
    <aside className="donation-prompt" role="complementary" aria-label="Donation reminder">
      <button
        className="donation-prompt__close"
        onClick={dismiss}
        aria-label="Dismiss"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <p className="donation-prompt__text">
        Help a family find stable housing today.
      </p>
      <div className="donation-prompt__actions">
        <Link to="/donate" className="btn btn--accent btn--sm" onClick={dismiss}>
          Donate Now
        </Link>
        <a href={site.phoneHref} className="donation-prompt__call">
          or call {site.phone}
        </a>
      </div>
    </aside>
  );
}

export default DonationPrompt;

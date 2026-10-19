import { Link } from 'react-router-dom';
import TrustBadge from './TrustBadge';
import './InlineDonateBanner.css';

/**
 * Mobile-only, in-flow donate prompt. Replaces the fixed DonationPrompt on
 * phones so nothing ever floats over hero or footer buttons (audit finding 1).
 */
function InlineDonateBanner() {
  return (
    <aside className="inline-donate" aria-label="Support Genesis Garden">
      <div className="container inline-donate__inner">
        <p className="inline-donate__text">Help a family find stable housing today.</p>
        <Link to="/donate" className="btn btn--accent btn--lg inline-donate__btn">
          Donate Now
        </Link>
        <TrustBadge tone="dark" />
      </div>
    </aside>
  );
}

export default InlineDonateBanner;

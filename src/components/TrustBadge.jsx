import donate from '../content/donate.json';
import './TrustBadge.css';

/**
 * Compact trust mark: Candid seal + 501(c)(3) / tax-deductible line.
 * Reused next to donate buttons so trust signals aren't only on /donate
 * (audit finding 3).
 */
function TrustBadge({ tone = 'light', className = '' }) {
  const { seal } = donate;
  return (
    <div className={`trust-badge trust-badge--${tone} ${className}`.trim()}>
      {seal.imageUrl && (
        <img
          src={seal.imageUrl}
          alt={seal.imageAlt}
          className="trust-badge__seal"
          width="40"
          height="40"
          loading="lazy"
        />
      )}
      <p className="trust-badge__text">
        <span className="trust-badge__line">501(c)(3) nonprofit · Gifts are tax-deductible</span>
        {seal.heading && <span className="trust-badge__sub">{seal.heading}</span>}
      </p>
    </div>
  );
}

export default TrustBadge;

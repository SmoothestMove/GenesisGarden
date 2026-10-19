import donate from '../content/donate.json';
import './GivingTiers.css';

/**
 * "What your gift does" cards tied to real costs (audit finding 3).
 * Content-gated: renders nothing until the team adds tiers in /admin
 * (Donate Page → Giving Tiers).
 */
function GivingTiers({ heading = true }) {
  const { givingTiers = [], financial, monthlyUrl } = donate;
  if (!givingTiers.length) return null;

  return (
    <div className="giving-tiers">
      {heading && <h2 className="giving-tiers__heading">What your gift does</h2>}
      <ul className="giving-tiers__grid">
        {givingTiers.map((tier) => (
          <li key={tier.amount} className="giving-tiers__card">
            <a
              href={financial.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="giving-tiers__link"
            >
              <span className="giving-tiers__amount">{tier.amount}</span>
              <span className="giving-tiers__outcome">{tier.outcome}</span>
              <span className="sr-only"> (opens donation form in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      {monthlyUrl && (
        <a
          href={monthlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--outline giving-tiers__monthly"
        >
          Give monthly
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

export default GivingTiers;

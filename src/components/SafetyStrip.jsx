import site from '../content/site.json';
import './SafetyStrip.css';

/**
 * "In danger or unsafe right now?" — tap-to-call referral lines
 * (audit finding 2). Content-gated: renders only when the team has turned it
 * on in /admin (Site Settings → Safety Strip) and at least one line exists.
 */
function SafetyStrip({ className = '' }) {
  const { safetyStrip } = site;
  if (!safetyStrip?.enabled || !safetyStrip.lines?.length) return null;

  return (
    <aside className={`safety-strip ${className}`.trim()} aria-labelledby="safety-strip-heading">
      <div className="container safety-strip__inner">
        <h2 id="safety-strip-heading" className="safety-strip__heading">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          {safetyStrip.heading}
        </h2>
        <ul className="safety-strip__list">
          {safetyStrip.lines.map((line) => (
            <li key={line.number}>
              <a href={`tel:${line.number.replace(/[^0-9]/g, '')}`} className="safety-strip__link">
                <span className="safety-strip__number">{line.number}</span>
                <span className="safety-strip__label">{line.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SafetyStrip;

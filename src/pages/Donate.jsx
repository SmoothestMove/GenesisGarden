import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import './Donate.css';

const wishItems = [
  'Pots, pans, kitchen utensils',
  'Dining tables and chairs',
  'Dressers',
];

const shelterItems = [
  'Patio furniture',
  'Outdoor chairs',
  'Umbrella bases & umbrellas',
];

const dontAccept = [
  'Clothing or shoes (unless we make a specific request)',
  'Mattresses',
];

function Donate() {
  const [sealRef, sealInView] = useInView();
  const [cardsRef, cardsInView] = useInView({ threshold: 0.05 });

  return (
    <>
      <SEOHead
        title="Donate | Genesis Garden"
        description="Support Genesis Garden with tax-deductible donations. We accept financial contributions and gently used household goods to help families find stable housing."
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">Support Our Mission</h1>
          <p className="animate-fade-in-up delay-1">
            We hope you'll help us do this work! Genesis Garden is an IRS-registered 501(c)(3),
            so your contributions are tax deductible.
          </p>
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-cream)" />

      {/* Candid Seal */}
      <section className="section" ref={sealRef}>
        <div className="container">
          <div className={`donate-seal reveal--scale${sealInView ? ' reveal--visible' : ''}`}>
            <div className="donate-seal__badge donate-seal__badge--image" aria-hidden="true">
              <img
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9277884/svg"
                alt="Candid Silver Seal of Transparency 2026"
                width="64"
                height="64"
                loading="lazy"
              />
            </div>
            <div className="donate-seal__text">
              <h2>2026 Candid Silver Seal of Transparency</h2>
              <p>
                We earned the 2026 Candid Silver Seal of Transparency — demonstrating
                our commitment to accountability and openness.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-off-white)" />

      {/* Financial & Goods Donations */}
      <section className="section section--alt" ref={cardsRef}>
        <div className="container">
          <div className="donate-grid">
            {/* Financial */}
            <div className={`donate-card donate-card--featured reveal${cardsInView ? ' reveal--visible' : ''}`}>
              <div className="donate-card__icon icon-container" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h2 className="donate-card__title">Financial Support</h2>
              <p>
                We accept monetary donations online and by check payable to Genesis Garden, mailed to:
              </p>
              <address className="donate-card__address">
                307 E Carroll St<br />
                Macomb, IL 61455
              </address>
              <a
                href="https://www.zeffy.com/en-US/donation-form/donate-to-support-stable-housing-in-macomb-and-western-illinois"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--accent btn--lg donate-card__btn btn--glow"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Donate Online
              </a>
            </div>

            {/* Goods */}
            <div className={`donate-card reveal${cardsInView ? ' reveal--visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
              <div className="donate-card__icon icon-container" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h2 className="donate-card__title">Donating Goods</h2>
              <p>
                Purchase an item from our wish lists at Amazon or Walmart, or donate gently used
                household goods and some furniture to help families settle into new homes.
              </p>
              <p className="donate-card__note">
                We are selective about furniture — please contact us ahead of time.
              </p>

              <h3>Items We Need</h3>
              <ul className="donate-list donate-list--accept">
                {wishItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3>For Our Shelters</h3>
              <ul className="donate-list donate-list--accept">
                {shelterItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3>What We Don't Accept</h3>
              <ul className="donate-list donate-list--decline">
                {dontAccept.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Donate;

import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import content from '../content/donate.json';
import site from '../content/site.json';
import './Donate.css';

function Donate() {
  const [sealRef, sealInView] = useInView();
  const [cardsRef, cardsInView] = useInView({ threshold: 0.05 });

  const { hero, seal, financial, goods } = content;

  return (
    <>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">{hero.heading}</h1>
          <p className="animate-fade-in-up delay-1">
            {hero.text}
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
                src={seal.imageUrl}
                alt={seal.imageAlt}
                width="64"
                height="64"
                loading="lazy"
              />
            </div>
            <div className="donate-seal__text">
              <h2>{seal.heading}</h2>
              <p>
                {seal.text}
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
              <h2 className="donate-card__title">{financial.heading}</h2>
              <p>
                {financial.intro}
              </p>
              <address className="donate-card__address">
                {site.address.street}<br />
                {site.address.cityStateZip}
              </address>
              <a
                href={financial.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--accent btn--lg donate-card__btn btn--glow"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {financial.buttonLabel}
              </a>
            </div>

            {/* Goods */}
            <div className={`donate-card reveal${cardsInView ? ' reveal--visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
              <div className="donate-card__icon icon-container" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h2 className="donate-card__title">{goods.heading}</h2>
              <p>
                {goods.intro}
              </p>
              <p className="donate-card__note">
                {goods.note}
              </p>

              <h3>{goods.wishHeading}</h3>
              <ul className="donate-list donate-list--accept">
                {goods.wishItems.map((item, i) => (
                  <li
                    key={item}
                    className={`reveal${cardsInView ? ' reveal--visible' : ''}`}
                    style={{ transitionDelay: `${0.2 + i * 0.05}s` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <h3>{goods.shelterHeading}</h3>
              <ul className="donate-list donate-list--accept">
                {goods.shelterItems.map((item, i) => (
                  <li
                    key={item}
                    className={`reveal${cardsInView ? ' reveal--visible' : ''}`}
                    style={{ transitionDelay: `${0.2 + i * 0.05}s` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <h3>{goods.declineHeading}</h3>
              <ul className="donate-list donate-list--decline">
                {goods.dontAccept.map((item, i) => (
                  <li
                    key={item}
                    className={`reveal${cardsInView ? ' reveal--visible' : ''}`}
                    style={{ transitionDelay: `${0.2 + i * 0.05}s` }}
                  >
                    {item}
                  </li>
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

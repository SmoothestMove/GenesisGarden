import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import content from '../content/summer-meals.json';
import site from '../content/site.json';
import './SummerMeals.css';

const PIN_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

function SummerMeals() {
  const [gridRef, gridInView] = useInView();

  return (
    <>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
      />

      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">{content.hero.heading}</h1>
          <p className="animate-fade-in-up delay-1">
            {content.hero.text}
          </p>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-cream)" />

      <section className="section section--summer-warm" ref={gridRef}>
        <div className="container">
          <div className="summer-notice">
            <strong>Content note:</strong> {content.contentNote}
          </div>

          <p>
            {content.intro}
          </p>

          <h2 style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-5)' }}>
            {content.sitesHeading}
          </h2>
          <div className={`summer-sites${gridInView ? ' summer-sites--visible' : ''}`}>
            {content.sites.map((mealSite) => (
              <div className="card summer-site-card" key={mealSite.name}>
                {mealSite.address ? (
                  <div className="summer-site-card__map">
                    <iframe
                      title={`Map of ${mealSite.name}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(mealSite.address)}&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : (
                  <div className="summer-site-card__map summer-site-card__map--unavailable">
                    {PIN_ICON}
                    <span>Map unavailable — no address on file yet</span>
                  </div>
                )}
                <h3 className="card__title">{mealSite.name}</h3>
                {mealSite.address && <p className="summer-site-card__address">{mealSite.address}</p>}
                <p>{mealSite.schedule}</p>
                {mealSite.address && (
                  <a
                    className="summer-site-card__directions"
                    href={`https://www.google.com/maps?q=${encodeURIComponent(mealSite.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>

          <p style={{ marginTop: 'var(--space-6)' }}>{content.signupNote}</p>
        </div>
      </section>

      <SectionDivider shape="tilt" color="var(--color-accent-dark)" />

      <section className="cta-section cta-section--warm">
        <div className="cta-section__bg" aria-hidden="true">
          <div className="cta-section__bg-overlay" />
        </div>
        <div className="container cta-section__content cta-section__content--visible">
          <h2>{content.cta.heading}</h2>
          <p>{content.cta.text}</p>
          <div className="cta-section__actions">
            <a href={site.phoneHref} className="btn btn--accent btn--lg btn--glow">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default SummerMeals;

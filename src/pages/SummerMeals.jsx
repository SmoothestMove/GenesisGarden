import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import content from '../content/summer-meals.json';
import site from '../content/site.json';
import './SummerMeals.css';

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

      <SectionDivider shape="wave" color="var(--color-cream)" />

      <section className="section" ref={gridRef}>
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
                <h3 className="card__title">{mealSite.name}</h3>
                {mealSite.address && <p className="summer-site-card__address">{mealSite.address}</p>}
                <p>{mealSite.schedule}</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 'var(--space-6)' }}>{content.signupNote}</p>
        </div>
      </section>

      <SectionDivider shape="tilt" color="var(--color-primary-dark)" />

      <section className="cta-section">
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

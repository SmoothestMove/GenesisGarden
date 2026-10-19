import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import content from '../content/privacy.json';
import site from '../content/site.json';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
      />

      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">{content.hero.heading}</h1>
          <p className="animate-fade-in-up delay-1">{content.hero.text}</p>
          {content.hero.lastUpdated && (
            <p className="privacy-last-updated animate-fade-in-up delay-2">
              Last updated: {content.hero.lastUpdated}
            </p>
          )}
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-cream)" />

      <section className="section">
        <div className="container privacy-container">
          <div className="privacy-content">
            {content.sections.map((section) => (
              <article key={section.heading} className="privacy-block">
                <h2>{section.heading}</h2>
                <p>{section.content}</p>
              </article>
            ))}

            <div className="privacy-contact-card glass-card">
              <h3>Have questions about our privacy practices?</h3>
              <p>
                Reach out to us at{' '}
                <a href={`mailto:${site.email}`} className="contact-link">{site.email}</a>{' '}
                or call{' '}
                <a href={site.phoneHref} className="contact-link">{site.phone}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;

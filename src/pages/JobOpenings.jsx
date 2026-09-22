import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import content from '../content/job-openings.json';
import './JobOpenings.css';

function JobOpenings() {
  const [listRef, listInView] = useInView({ threshold: 0.05 });
  const hasOpenings = content.jobs.some((job) => job.status === 'open');

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

      <section className="section" ref={listRef}>
        <div className="container">
          {!hasOpenings && (
            <div className="job-notice job-notice--empty">
              <strong>No openings right now.</strong> Check back soon, or{' '}
              <a href="/contact-us">contact us</a> to ask about upcoming openings.
            </div>
          )}

          <div className="job-list">
            {content.jobs.map((job, i) => (
              <article
                key={job.title}
                className={`job-card${job.status === 'open' ? ' job-card--open' : ''} reveal${listInView ? ' reveal--visible' : ''}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <header className="job-card__header">
                  <h2>{job.title}</h2>
                  <span className={`job-badge job-badge--${job.status}`}>{job.statusLabel}</span>
                </header>
                {job.subtitle && <p className="job-card__subtitle">{job.subtitle}</p>}
                {job.description && <p>{job.description}</p>}
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="job-card__bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {job.status === 'open' && job.applyUrl && (
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--accent job-card__apply"
                  >
                    Apply on AmeriCorps.gov &rarr;
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="job-notice">
            <strong>Interested in future openings?</strong> {content.noticeText}{' '}
            <a href="/contact-us">Contact us</a> to ask about upcoming openings.
          </div>
        </div>
      </section>
    </>
  );
}

export default JobOpenings;

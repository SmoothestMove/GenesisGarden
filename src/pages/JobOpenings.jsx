import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import content from '../content/job-openings.json';
import './JobOpenings.css';

const STATUS_ICONS = {
  open: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  closed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'closed', label: 'Closed' },
];

function JobOpenings() {
  const [listRef, listInView] = useInView({ threshold: 0.05 });
  const [statusFilter, setStatusFilter] = useState('all');

  const openCount = content.jobs.filter((j) => j.status === 'open').length;
  const closedCount = content.jobs.filter((j) => j.status === 'closed').length;
  const totalCount = content.jobs.length;
  const countByStatus = { all: totalCount, open: openCount, closed: closedCount };
  const visibleJobs = statusFilter === 'all'
    ? content.jobs
    : content.jobs.filter((j) => j.status === statusFilter);

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
          <div className="job-toolbar">
            <span className="job-toolbar__count">{openCount} open of {totalCount} listed</span>
            <div className="job-filter" role="tablist" aria-label="Filter by status">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={statusFilter === f.id}
                  className={`job-filter__btn${statusFilter === f.id ? ' job-filter__btn--active' : ''}`}
                  onClick={() => setStatusFilter(f.id)}
                >
                  {f.label} ({countByStatus[f.id]})
                </button>
              ))}
            </div>
          </div>

          <div className="job-list">
            {visibleJobs.map((job, i) => (
              <article
                key={job.title}
                className={`job-card${job.status === 'open' ? ' job-card--open' : ''} reveal${listInView ? ' reveal--visible' : ''}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <header className="job-card__header">
                  <span className={`job-card__status-icon job-card__status-icon--${job.status}`} aria-hidden="true">
                    {STATUS_ICONS[job.status]}
                  </span>
                  <h2>{job.title}</h2>
                  <span className={`job-badge job-badge--${job.status}`}>{job.statusLabel}</span>
                </header>
                {job.subtitle && (
                  <div className="job-card__tags">
                    {job.subtitle.split(' · ').map((tag) => (
                      <span className="job-card__tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
                {job.description && <p>{job.description}</p>}
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="job-card__bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {job.applyUrl && (
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
            {visibleJobs.length === 0 && (
              <p className="job-empty">No positions match this filter.</p>
            )}
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

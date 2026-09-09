import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import './JobOpenings.css';

const jobs = [
  {
    title: 'Housing Counseling',
    subtitle: "AmeriCorps VISTA, Sept 2026-2027 · Part of Housing Action Illinois' Housing Counseling Corps",
    status: 'open',
    statusLabel: 'Applications close July 31, 2026',
    bullets: [
      'Earn a HUD housing counseling certification',
      "Pivotal role in the launch of Genesis Garden's housing counseling services",
      'Develop and lead sessions such as financial education, budgeting, credit counseling, renting, home repair, and homeownership preparation',
    ],
    description:
      'Receive custom training, support, networking, and post-service employment opportunities in the housing counseling field, in addition to the traditional benefits of AmeriCorps VISTA. Ideal candidate takes initiative and demonstrates a strengths-based view of all people. Well-organized, eager to learn, and solution-oriented. Well-suited for those with an interest and long-term career goals in housing counseling and low-to-moderate income homeownership.',
    applyUrl: 'https://my.americorps.gov/mp/listing/viewListing.do?id=128971',
  },
  {
    title: 'Recovery Navigator',
    subtitle: 'Recovery Corps AmeriCorps VISTA, Sept 2026-2027',
    status: 'closed',
    statusLabel: 'Final candidates have been selected for this position',
    description:
      'Help others build a healthy life in recovery as part of Recovery Corps! Provide peer support to those in recovery from substance use disorders. Recovery Navigators are peers who work 1-on-1 with the people they are serving, offering individual support and mentoring as someone with lived experience in recovery.',
  },
  {
    title: 'Recovery Project Coordinator',
    subtitle: 'Recovery Corps AmeriCorps VISTA, Sept 2026-2027',
    status: 'closed',
    statusLabel: 'This position has been filled',
    description:
      'Help make recovery possible for more people! Support project management, data collection and analysis, and education outreach with great training and coaching. Individuals who have lived experience with recovery are encouraged to apply for future openings.',
  },
  {
    title: 'Fundraising & Volunteer Development',
    subtitle: "AmeriCorps VISTA, Sept 2026-2027 · Part of Housing Action Illinois' Housing Action Corps",
    status: 'closed',
    statusLabel: 'This position has been filled',
    description:
      'Receive custom training, support, and networking in housing and community development, in addition to the traditional benefits of AmeriCorps VISTA. Develop and implement fundraising tools and strategies, raise funds to construct a tiny home or other residential property development, and develop a structured volunteer program.',
  },
  { title: 'Summer Meals', status: 'closed', statusLabel: 'This position has been filled' },
  { title: 'Office Professional', status: 'closed', statusLabel: 'This position has been filled' },
  { title: 'Outreach & Permanent Supportive Housing (PSH)', status: 'closed', statusLabel: 'This position has been filled' },
];

function JobOpenings() {
  const [listRef, listInView] = useInView({ threshold: 0.05 });

  return (
    <>
      <SEOHead
        title="Job Openings | Genesis Garden"
        description="Current AmeriCorps VISTA and Recovery Corps openings at Genesis Garden in Macomb, Illinois."
      />

      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">Job Openings</h1>
          <p className="animate-fade-in-up delay-1">
            We host AmeriCorps VISTA and Recovery Corps service positions supporting housing
            counseling, recovery navigation, fundraising, and more.
          </p>
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-cream)" />

      <section className="section" ref={listRef}>
        <div className="container">
          <div className="job-list">
            {jobs.map((job, i) => (
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
                {job.bullets && (
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
          </div>

          <div className="job-notice">
            <strong>Interested in future openings?</strong> Positions not currently accepting
            applications are shown so you can see the range of roles Genesis Garden hosts.{' '}
            <a href="/contact-us">Contact us</a> to ask about upcoming openings.
          </div>
        </div>
      </section>
    </>
  );
}

export default JobOpenings;

import SEOHead from '../components/SEOHead';
import useInView from '../hooks/useInView';
import './Partners.css';

const partners = [
  {
    name: 'Empower',
    description: 'The Empower deflection initiative supports people with resources and referrals to housing or treatment, offering area law enforcement alternatives to arrest.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    name: 'McDonough-Fulton Regional System of Care (ROSC)',
    description: 'Regional Systems of Care coordinate community resources to provide comprehensive support for individuals and families facing substance use and mental health challenges.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    name: 'ROE 26 IRIS and YES Networks',
    description: 'Regional education-based networks supporting students and families with resources and intervention services across the region.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    name: 'McDonough County InterAgency Council',
    description: 'A collaborative council of local agencies working together to coordinate services and support for residents of McDonough County.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    name: 'West Central Illinois Continuum of Care, IL-519',
    description: 'A regional partnership of organizations working to end homelessness through coordinated resources, planning and federal funding.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: 'Housing Action Illinois',
    description: 'A statewide coalition working to increase and preserve the supply of decent, affordable housing and to reduce homelessness across Illinois.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

function Partners() {
  const [gridRef, gridInView] = useInView({ threshold: 0.05 });

  return (
    <>
      <SEOHead
        title="Partners | Genesis Garden"
        description="Genesis Garden partners with local and regional organizations including Empower, ROSC, Continuum of Care, and Housing Action Illinois."
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">Our Partners</h1>
          <p className="animate-fade-in-up delay-1">
            Genesis Garden is part of several networks connected to our activities.
            These formal and informal engagements make it possible to do what we do!
          </p>
        </div>
      </section>

      {/* Partner Cards */}
      <section className="section" ref={gridRef}>
        <div className="container">
          <div className="partners-grid">
            {partners.map((partner, i) => (
              <article
                key={partner.name}
                className={`partner-card glass-card reveal--scale${gridInView ? ' reveal--visible' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="partner-card__icon icon-container" aria-hidden="true">
                  {partner.icon}
                </div>
                <h2 className="partner-card__name">{partner.name}</h2>
                <p className="partner-card__desc">{partner.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Partners;

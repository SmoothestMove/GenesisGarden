import SEOHead from '../components/SEOHead';
import useInView from '../hooks/useInView';
import content from '../content/partners.json';
import './Partners.css';

const ICON_PROPS = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' };

const PARTNER_ICONS = {
  bell: (
    <svg {...ICON_PROPS}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  globe: (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  book: (
    <svg {...ICON_PROPS}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  building: (
    <svg {...ICON_PROPS}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  people: (
    <svg {...ICON_PROPS}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  house: (
    <svg {...ICON_PROPS}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

function Partners() {
  const [gridRef, gridInView] = useInView({ threshold: 0.05 });

  return (
    <>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">{content.hero.heading}</h1>
          <p className="animate-fade-in-up delay-1">
            {content.hero.text}
          </p>
        </div>
      </section>

      {/* Partner Cards */}
      <section className="section" ref={gridRef}>
        <div className="container">
          <div className="partners-grid">
            {content.partners.map((partner, i) => (
              <article
                key={partner.name}
                className={`partner-card glass-card reveal--scale${gridInView ? ' reveal--visible' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="partner-card__icon icon-container" aria-hidden="true">
                  {PARTNER_ICONS[partner.icon]}
                </div>
                <h2 className="partner-card__name">{partner.name}</h2>
                {partner.description && <p className="partner-card__desc">{partner.description}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Partners;

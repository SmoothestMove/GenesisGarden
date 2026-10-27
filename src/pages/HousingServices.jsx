import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import SafetyStrip from '../components/SafetyStrip';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import useMediaQuery from '../hooks/useMediaQuery';
import useParallax from '../hooks/useParallax';
import content from '../content/housing-services.json';
import site from '../content/site.json';
import './HousingServices.css';

const SITUATION_FILTERS = [
  { id: 'all', label: 'Show me everything', titles: null },
  { id: 'stay', label: 'I want to stay where I am', titles: ['Diversion', 'Eviction Prevention'] },
  { id: 'shelter', label: 'I need shelter now', titles: ['Emergency Shelter'] },
  { id: 'permanent', label: "I'm ready for something permanent", titles: ['Rapid Re-Housing', 'Permanent Supportive Housing'] },
];

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.8',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const SERVICE_ICONS = {
  exchange: (
    <svg {...ICON_PROPS}>
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  shield: (
    <svg {...ICON_PROPS}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  house: (
    <svg {...ICON_PROPS}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  target: (
    <svg {...ICON_PROPS}>
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  heart: (
    <svg {...ICON_PROPS}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  calendar: (
    <svg {...ICON_PROPS} width="24" height="24">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
};

const IMPACT_ICONS = {
  health: (
    <svg {...ICON_PROPS} width="22" height="22">
      <path d="M12 2v20M2 12h20" strokeWidth="2.2" />
    </svg>
  ),
  crowd: (
    <svg {...ICON_PROPS} width="22" height="22">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  court: (
    <svg {...ICON_PROPS} width="22" height="22">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="16" x2="12" y2="16" />
    </svg>
  ),
  shelter: (
    <svg {...ICON_PROPS} width="22" height="22">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <line x1="12" y1="12" x2="12" y2="17" strokeWidth="2" />
    </svg>
  ),
  hope: (
    <svg {...ICON_PROPS} width="28" height="28">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="12" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
};

function HousingServices() {
  const [introRef, introInView] = useInView();
  const [servicesRef, servicesInView] = useInView({ threshold: 0.05 });
  const [eligRef, eligInView] = useInView();
  const [actRef, actInView] = useInView();
  const heroParallaxRef = useParallax();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [introOpen, setIntroOpen] = useState(false);
  const [situationFilter, setSituationFilter] = useState('all');
  const [activeEligIndex, setActiveEligIndex] = useState(null);
  const toggleElig = (index) => setActiveEligIndex((prev) => (prev === index ? null : index));
  const activeFilter = SITUATION_FILTERS.find((f) => f.id === situationFilter);
  const matchedCount = activeFilter.titles
    ? content.services.items.filter((service) => activeFilter.titles.includes(service.title)).length
    : content.services.items.length;

  const { hero, intro, services, eligibility, otherActivities, cta } = content;

  return (
    <>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
      />

      {/* Page Hero */}
      <section className="housing-hero">
        <div className="housing-hero__bg" aria-hidden="true" ref={heroParallaxRef}>
          <img
            src={hero.backgroundImage}
            alt=""
            className="housing-hero__bg-image"
            loading="eager"
          />
          <div className="housing-hero__bg-overlay" />
        </div>
        <div className="container housing-hero__content">
          <h1 className="animate-fade-in-up">{hero.heading}</h1>
          <p className="animate-fade-in-up delay-1">
            {hero.text}
          </p>
        </div>
      </section>

      {/* Safety & Crisis Referral Strip */}
      <SafetyStrip />

      <SectionDivider shape="wave" color="var(--color-off-white)" />

      {/* Services List with Immediate Situation Triage */}
      <section className="section section--alt" id="services" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <h2>{services.heading}</h2>
            <p>{services.subtitle}</p>
          </div>
          <div className="situation-filter" role="group" aria-label="Filter services by your situation">
            <span className="situation-filter__label">What's your situation?</span>
            <div className="situation-filter__pills">
              {SITUATION_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`situation-filter__pill${situationFilter === f.id ? ' situation-filter__pill--active' : ''}`}
                  aria-pressed={situationFilter === f.id}
                  onClick={() => setSituationFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {activeFilter.titles
              ? `Highlighting ${matchedCount} of ${services.items.length} services for “${activeFilter.label}”.`
              : `Showing all ${services.items.length} services.`}
          </p>
          <div className="services-grid">
            {services.items.map((service, i) => {
              const matched = !activeFilter.titles || activeFilter.titles.includes(service.title);
              return (
              <article
                key={service.title}
                className={`service-card reveal--scale${servicesInView ? ' reveal--visible' : ''}${matched ? '' : ' service-card--dimmed'}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="service-card__icon icon-container" aria-hidden="true">
                  {SERVICE_ICONS[service.icon]}
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__text">{service.description}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-white)" />

      {/* Housing Philosophy / How We Help (The Reality & The Hope) */}
      <section className="section housing-intro-section" ref={introRef}>
        <div className="container housing-intro">
          <div className={`housing-intro__content reveal${introInView ? ' reveal--visible' : ''}`}>
            {intro.badge && (
              <span className="housing-intro__badge">{intro.badge}</span>
            )}
            <h2 className="housing-intro__heading">{intro.heading}</h2>
            <p className="housing-intro__lead">
              {intro.subheading || intro.paragraph1}
            </p>

            {intro.impacts && (
              <div className="housing-intro__impacts-grid" role="list">
                {intro.impacts.map((impact, i) => (
                  <div
                    key={impact.title}
                    className="housing-intro__impact-card"
                    style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
                    role="listitem"
                  >
                    <div className={`housing-intro__impact-icon housing-intro__impact-icon--${impact.icon}`} aria-hidden="true">
                      {IMPACT_ICONS[impact.icon] || SERVICE_ICONS.house}
                    </div>
                    <h3 className="housing-intro__impact-title">{impact.title}</h3>
                    <p className="housing-intro__impact-desc">{impact.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Hope & Empowerment Heroic Banner */}
            <div className="housing-intro__hope-card">
              <div className="housing-intro__hope-icon-wrap" aria-hidden="true">
                {IMPACT_ICONS.hope}
              </div>
              <div className="housing-intro__hope-body">
                <h3 className="housing-intro__hope-headline gradient-text">
                  {intro.highlight}
                </h3>
                <p className="housing-intro__hope-text">
                  {intro.paragraph2}
                </p>
                <div className="housing-intro__hope-actions">
                  <Link to={intro.ctaLink || '/contact-us'} className="btn btn--primary">
                    {intro.ctaLabel || 'Talk With Us'} &rarr;
                  </Link>
                  {site.phone && (
                    <a href={site.phoneHref} className="housing-intro__phone-callout">
                      <span aria-hidden="true">📞</span>
                      <span>Or call <strong>{site.phone}</strong></span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section" ref={eligRef}>
        <div className="container">
          <div className={`eligibility reveal${eligInView ? ' reveal--visible' : ''}`}>
            <h2>{eligibility.heading}</h2>
            <p>
              {eligibility.intro}
            </p>
            <div className="eligibility__grid" role="region" aria-label="Eligibility categories">
              {eligibility.items.map((item, i) => {
                const title = typeof item === 'string' ? item : item.title;
                const desc = typeof item === 'object' ? item.description : null;
                const isExpanded = activeEligIndex === i;

                return (
                  <div
                    key={title}
                    style={{ transitionDelay: `${0.2 + i * 0.04}s` }}
                    className={`eligibility__card reveal${eligInView ? ' reveal--visible' : ''}${isExpanded ? ' is-active' : ''}`}
                    onClick={() => toggleElig(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleElig(i);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`${title}${desc ? ': click or hover for description' : ''}`}
                  >
                    <div className="eligibility__header">
                      <span className="eligibility__badge" aria-hidden="true">✓</span>
                      <span className="eligibility__title">{title}</span>
                      {desc && (
                        <span className="eligibility__toggle" aria-hidden="true">
                          {isExpanded ? '−' : '+'}
                        </span>
                      )}
                    </div>
                    {desc && (
                      <div className="eligibility__details">
                        <p>{desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {eligibility.hint && (
              <p className="eligibility__hint">
                <small>💡 {eligibility.hint}</small>
              </p>
            )}
          </div>
        </div>
      </section>

      <SectionDivider shape="organic" color="var(--color-off-white)" />

      {/* Other Activities */}
      <section className="section section--alt" ref={actRef}>
        <div className="container">
          <div className="section-header">
            <h2>{otherActivities.heading}</h2>
          </div>
          <div className={`other-activities reveal--scale${actInView ? ' reveal--visible' : ''}`}>
            <div className="card">
              <div className="card__icon" aria-hidden="true">
                {SERVICE_ICONS[otherActivities.icon]}
              </div>
              <h3 className="card__title">{otherActivities.title}</h3>
              <p className="card__text">
                {otherActivities.text}
              </p>
              <Link to={otherActivities.linkTo} className="footer__link" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                {otherActivities.linkLabel} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="tilt" color="var(--color-primary-dark)" />

      {/* Contact CTA */}
      <section className="cta-section">
        <div className="cta-section__bg" aria-hidden="true">
          <div className="cta-section__bg-overlay" />
        </div>
        <div className="container cta-section__content cta-section__content--visible">
          <h2>{cta.heading}</h2>
          <p>
            {cta.text}
          </p>
          <div className="cta-section__actions">
            <a href={site.phoneHref} className="btn btn--accent btn--lg btn--glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {site.phone}
            </a>
            <Link to={cta.secondaryButtonTo} className="btn btn--outline-white btn--lg">
              {cta.secondaryButtonLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HousingServices;

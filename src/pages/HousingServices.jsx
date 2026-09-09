import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import './HousingServices.css';

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    title: 'Diversion',
    description: 'Finding out what it would take for you to stay where you are now. Or re-connecting with family or friends who could house you for at least 30 days.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Eviction Prevention',
    description: 'Working with you and/or your landlord, providing financial resources, or referring you to the CBRAP program. In most cases, financial support requires an eviction notice and documentation of means to pay rent going forward.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Emergency Shelter',
    description: 'Our primary location, Genesis House, is a large remodeled Victorian era house with private bedrooms and bathrooms, plus shared living, laundry, and kitchen. Leighty House offers similar space. We also use motel rooms when at capacity.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
    title: 'Rapid Re-Housing',
    description: 'Financial assistance and support services to move families from no housing into permanent housing as quickly as possible. Support tapers down over several months as the family regains stability.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Permanent Supportive Housing',
    description: 'For families with documented long-term disabilities who have lost housing, PSH offers more supportive services and rent subsidies without a specific time limit.',
  },
];

function HousingServices() {
  const [introRef, introInView] = useInView();
  const [servicesRef, servicesInView] = useInView({ threshold: 0.05 });
  const [eligRef, eligInView] = useInView();
  const [actRef, actInView] = useInView();

  return (
    <>
      <SEOHead
        title="Housing Services | Genesis Garden"
        description="Genesis Garden provides emergency shelter, eviction prevention, rapid re-housing, and permanent supportive housing in Western Illinois."
      />

      {/* Page Hero */}
      <section className="housing-hero">
        <div className="housing-hero__bg" aria-hidden="true">
          <img
            src="/images/GGHouseFrontEdit.png"
            alt=""
            className="housing-hero__bg-image"
            loading="eager"
          />
          <div className="housing-hero__bg-overlay" />
        </div>
        <div className="container housing-hero__content">
          <h1 className="animate-fade-in-up">Housing Supports &amp; Services</h1>
          <p className="animate-fade-in-up delay-1">
            Everyone needs a safe and stable place to call home. Home is more than a place —
            home ignites hope and fuels dreams for healthy people and resilient families.
          </p>
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-cream)" />

      {/* Intro */}
      <section className="section" ref={introRef}>
        <div className="container housing-intro">
          <div className={`housing-intro__content reveal${introInView ? ' reveal--visible' : ''}`}>
            <h2>What Happens Without Housing?</h2>
            <p>
              When there aren't enough safe, stable, affordable places for everyone to live?
              Skipping crucial medications and meals. Doubling up. Eviction. Homelessness.
            </p>
            <p className="housing-intro__highlight gradient-text">
              But homelessness doesn't have to be hopeless.
            </p>
            <p>
              If you're struggling with safe, stable housing, have a conversation with us.
              Together, we'll work toward a solution.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-off-white)" />

      {/* Services List */}
      <section className="section section--alt" id="services" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <h2>Our Solutions</h2>
            <p>We offer a range of housing support services tailored to your situation.</p>
          </div>
          <div className="services-grid">
            {services.map((service, i) => (
              <article
                key={service.title}
                className={`service-card reveal--scale${servicesInView ? ' reveal--visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="service-card__icon icon-container" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__text">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section" ref={eligRef}>
        <div className="container">
          <div className={`eligibility reveal${eligInView ? ' reveal--visible' : ''}`}>
            <h2>Who Can We Help?</h2>
            <p>
              Most of these options for regaining housing stability are open to:
            </p>
            <ul className="eligibility__list">
              {[
                'Multi-generational families',
                'Large families',
                'Self-defined households',
                'Returning citizens',
                'Those who are justice-involved but may not be eligible for other housing supports',
              ].map((item, i) => (
                <li key={item} style={{ transitionDelay: `${0.3 + i * 0.08}s` }} className={`reveal${eligInView ? ' reveal--visible' : ''}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectionDivider shape="organic" color="var(--color-off-white)" />

      {/* Other Activities */}
      <section className="section section--alt" ref={actRef}>
        <div className="container">
          <div className="section-header">
            <h2>Other Activities</h2>
          </div>
          <div className={`other-activities reveal--scale${actInView ? ' reveal--visible' : ''}`}>
            <div className="card">
              <div className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>
              <h3 className="card__title">Summer Meals for Kids</h3>
              <p className="card__text">
                Ensuring children in our community have access to nutritious meals during the summer months.
              </p>
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
          <h2>Need Housing Help?</h2>
          <p>
            Call Genesis Garden to talk about your housing needs. We're here to listen and
            work with you toward a solution.
          </p>
          <div className="cta-section__actions">
            <a href="tel:3093263075" className="btn btn--accent btn--lg btn--glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              309-326-3075
            </a>
            <Link to="/contact-us" className="btn btn--outline-white btn--lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HousingServices;

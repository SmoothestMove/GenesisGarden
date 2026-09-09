import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import AnimatedCounter from '../components/AnimatedCounter';
import useInView from '../hooks/useInView';
import './AboutUs.css';

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Compassion',
    description: 'Meeting people where they are with empathy and understanding',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Respect',
    description: 'Honoring the dignity and worth of every individual we serve',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Integrity',
    description: 'Acting with honesty and transparency in everything we do',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Service',
    description: 'Dedicating ourselves to making a positive impact in our community',
  },
];

function AboutUs() {
  const [mvRef, mvInView] = useInView();
  const [valRef, valInView] = useInView();
  const [teamRef, teamInView] = useInView();
  const [histRef, histInView] = useInView();

  return (
    <>
      <SEOHead
        title="About Us | Genesis Garden"
        description="Learn about Genesis Garden, a 501(c)(3) nonprofit serving McDonough County and Western Illinois with safe, stable, and affordable housing."
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">About Genesis Garden</h1>
          <p className="animate-fade-in-up delay-1">
            A 501(c)(3) non-profit organization dedicated to providing safe, stable, and
            affordable housing options for those in need.
          </p>
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-cream)" />

      {/* Mission, Vision */}
      <section className="section" ref={mvRef}>
        <div className="container">
          <div className={`about-mv-grid${mvInView ? ' about-mv-grid--visible' : ''}`}>
            <div className="about-mv-card about-mv-card--mission">
              <div className="about-mv-card__label">Our Mission</div>
              <h2>To provide safe, stable, and affordable housing options for those in need.</h2>
            </div>
            <div className="about-mv-card about-mv-card--vision">
              <div className="about-mv-card__label">Our Vision</div>
              <h2>To create a community where everyone has a safe and stable place to call home.</h2>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-off-white)" />

      {/* Values */}
      <section className="section section--alt" ref={valRef}>
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
          </div>
          <div className="grid grid--4">
            {values.map((value, i) => (
              <div
                key={value.title}
                className={`value-card card reveal--scale${valInView ? ' reveal--visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="value-card__icon icon-container" aria-hidden="true">
                  {value.icon}
                </div>
                <h3 className="card__title">{value.title}</h3>
                <p className="card__text">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — Split Layout with Image */}
      <section className="section about-team-section" ref={teamRef}>
        <div className="container">
          <div className={`about-team-grid${teamInView ? ' about-team-grid--visible' : ''}`}>
            <div className="about-team-grid__image">
              <img
                src="/images/campus_wide.jpg"
                alt="Genesis Garden campus"
                loading="lazy"
              />
            </div>
            <div className="about-team-grid__content">
              <h2>Our Team</h2>
              <p>
                Genesis Garden is led by a dedicated team of staff and volunteers who are passionate
                about our mission. Our team works tirelessly to provide the best possible services to
                our clients and to make a positive impact in our community.
              </p>
              <div className="about-team-stats">
                <div className="about-team-stat">
                  <span className="about-team-stat__number gradient-text">
                    <AnimatedCounter end={15} suffix="+" />
                  </span>
                  <span className="about-team-stat__label">Years Active</span>
                </div>
                <div className="about-team-stat">
                  <span className="about-team-stat__number gradient-text">
                    <AnimatedCounter end={4} suffix="" />
                  </span>
                  <span className="about-team-stat__label">Counties</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="organic" color="var(--color-off-white)" />

      {/* History & Impact */}
      <section className="section section--alt" ref={histRef}>
        <div className="container">
          <div className={`about-history-grid${histInView ? ' about-history-grid--visible' : ''}`}>
            <div className="about-block about-block--timeline">
              <div className="about-block__marker" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h2>Our History</h2>
              <p>
                Genesis Garden was founded in 2010 by a group of concerned citizens who saw a need
                for safe and affordable housing in McDonough County. Since then, we have grown to
                become a leading provider of housing services in the region, serving McDonough,
                Hancock, Henderson, and Warren Counties.
              </p>
            </div>
            <div className="about-block about-block--timeline">
              <div className="about-block__marker" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h2>Our Impact</h2>
              <p>
                Over the years, Genesis Garden has helped countless individuals and families find
                safe and stable housing. We are proud of our track record and are committed to
                continuing our work in the community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;

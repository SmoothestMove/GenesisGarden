import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import AnimatedCounter from '../components/AnimatedCounter';
import useInView from '../hooks/useInView';
import './AboutUs.css';

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" strokeLinecap="round" />
      </svg>
    ),
    title: 'Empowerment',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Community',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Compassion',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Strengths-focused',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2s-8 4.5-8 11a8 8 0 0 0 16 0c0-6.5-8-11-8-11z" />
      </svg>
    ),
    title: 'Asset-based',
  },
];

const staff = [
  { name: 'Jeanetta Thorpe', role: 'Genesis Housing Director' },
  { name: 'Chaka Donald', role: 'Property Manager' },
  { name: 'Amanda Bolte', role: 'Outreach & PSH Care Manager' },
  { name: 'Anita Brown', role: 'Office Professional & SOAR Specialist' },
];

const directors = [
  { name: 'Melissa Calhoun', role: 'President' },
  { name: 'David Monninger', role: 'Vice President' },
  { name: 'Mark Merrill', role: 'Treasurer' },
  { name: 'Kathy Stoner-Lasala', role: '' },
  { name: 'Marie Blome', role: '' },
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
            Genesis Garden is a 501(c)(3) nonprofit based in Macomb, Illinois, founded as a
            grassroots organization dedicated to addressing and eliminating the effects of
            poverty through a proactive, preventative, and compassionate approach.
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
              <h2>Cultivating hope, nurturing community, empowering dreams.</h2>
            </div>
            <div className="about-mv-card about-mv-card--vision">
              <div className="about-mv-card__label">Our Vision</div>
              <h2>A resilient and hopeful community.</h2>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-off-white)" />

      {/* Values */}
      <section className="section section--alt" ref={valRef}>
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
          </div>
          <div className="grid grid--5">
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
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', color: 'var(--color-gray-600)' }}>
            In 2021, Genesis Garden's directors participated in a series of trainings to focus
            efforts more on transformational change and development using a lens of asset-based
            and holistic community development.
          </p>
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
              <h2>Staff</h2>
              <ul className="about-team-list">
                {staff.map((person) => (
                  <li key={person.name}>
                    <strong>{person.name}</strong>
                    <span>{person.role}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontStyle: 'italic', color: 'var(--color-gray-600)', marginTop: 'var(--space-3)' }}>
                In memory of{' '}
                <a href="http://crystalbrothe.com/" target="_blank" rel="noopener noreferrer">
                  Crystal Brothe
                </a>.
              </p>

              <h2 style={{ marginTop: 'var(--space-8)' }}>Directors</h2>
              <ul className="about-team-list">
                {directors.map((person) => (
                  <li key={person.name}>
                    <strong>{person.name}</strong>
                    {person.role && <span>{person.role}</span>}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 'var(--space-3)' }}>Founding President: Brooks Olds</p>
              <p style={{ marginTop: 'var(--space-4)' }}>
                <a href="/partners" className="footer__link" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                  See our partners &rarr;
                </a>
              </p>

              <div className="about-team-stats">
                <div className="about-team-stat">
                  <span className="about-team-stat__number gradient-text">
                    <AnimatedCounter end={new Date().getFullYear() - 2010} suffix="+" />
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

      {/* History */}
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
                Our inception was inspired by the rapid eviction of Shade Tree Mobile Park
                residents in 2010. This event exposed the lack of emergency and rapid re-housing
                in Macomb and McDonough County for families who suddenly find themselves without
                a place to live.
              </p>
            </div>
            <div className="about-block about-block--timeline">
              <div className="about-block__marker" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h2>Our Housing Work</h2>
              <p>
                Ranging from emergency shelter to rapid re-housing, eviction prevention to
                scattered-site permanent supportive housing, we work to meet people where they
                are, hold awareness of their lived experience, and assist with achieving stable
                housing — from getting a new state ID to arranging child care, food and medical
                benefits, employment, schooling, or transportation to safe housing with family
                or friends out of state.
              </p>
            </div>
            <div className="about-block about-block--timeline">
              <div className="about-block__marker" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                </svg>
              </div>
              <h2>Summer Meals</h2>
              <p>
                Summer Meals for Kids began in 2016 as a fixed-site meal service, then went on
                the road during the COVID-19 pandemic, taking advantage of USDA waivers, to
                deliver breakfast and lunch each day of the week. Between summers, our food
                focus turns to relationship-building while sharing meals — we believe shared
                meals at a table increase resilience.
              </p>
            </div>
            <div className="about-block about-block--timeline">
              <div className="about-block__marker" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <h2>West Central Illinois Open Table</h2>
              <p>
                In partnership with the West Central Illinois Open Table project, we support
                volunteer community members who walk alongside individuals or families
                ("friends") who would like support achieving their life goals. Friends and
                volunteers meet weekly for a year, developing relationships as the friends
                tackle and achieve milestones on the way to their goal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-cream)" />

      {/* Service Members & Volunteers */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Service Members &amp; Volunteers</h2>
          </div>
          <p>
            <strong>2026–2027 AmeriCorps VISTA Volunteers</strong> through Housing Action
            Illinois and Recovery Corps: Amber, Hayley, Justin, Richie.
          </p>

          <details className="about-volunteers-history">
            <summary>View past interns, VISTA volunteers &amp; Peace Corps Fellows (2020–2024)</summary>
            <div className="about-volunteers-history__body">
              <p><strong>2024 Macomb High Intern:</strong> Josie Calvert</p>
              <p>
                <strong>2023–2024 AmeriCorps VISTA Volunteer</strong> through Housing Action
                Illinois: Mariam Antoine
              </p>
              <p>
                <strong>2020–21 Interns, Peace Corps Fellows, and AmeriCorps VISTA Volunteers:</strong>{' '}
                Miranda Lambert (2020–21), Sydney Dewees (2020–21), Alexander Benishek (2021),
                Cortnie Schierman (2020–21), Zac Green (2021)
              </p>
              <p>Cindy Guzman, Intern, WIU Social Work Department (Spring 2021)</p>
              <p><strong>Summer 2020 Volunteers/Staff</strong></p>
              <p>
                AmeriCorps Summer VISTA: Adrienne Graham, Grace Merrett, Lily Mansfield, Ethan
                La Prad, Ethan Fogg, Gibby Blankenship, Devon Simpson, Jessica Moncrieff,
                Iliyana Olds, Marco Narvaez, Desi Blanken
              </p>
              <p>
                Peace Corps Fellows/AmeriCorps: Camden Arnold, Brianne Nichols, Meghan Elgee,
                Miranda Lambert, Gaothajying Her, Cortnie Schierman, Katie Colon
              </p>
              <p>Summer Meals Assistants: Annie Powell, Noah La Prad, Aiden Necak</p>
            </div>
          </details>
        </div>
      </section>
    </>
  );
}

export default AboutUs;

import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import AnimatedCounter from '../components/AnimatedCounter';
import useInView from '../hooks/useInView';
import './Home.css';

const thingsToKnow = [
  {
    number: '01',
    title: 'Explore All Options First',
    text: 'The best long-term outcomes happen when you don\'t enter emergency shelter. If you have SAFE housing now, what would it take for you to stay there? We\'ll talk with you about that, and whether family or friends could house you for 30 days.',
  },
  {
    number: '02',
    title: 'Shelter Is Temporary',
    text: 'Everyone should have a safe, stable place to live. Emergency shelter is a band-aid and is time-limited. The underlying cause of a lot of homelessness is that there is not enough permanent housing at the right price or configuration to meet demand.',
  },
  {
    number: '03',
    title: 'We Focus on Permanent Outcomes',
    text: 'During your time in emergency shelter with Genesis Garden, you will focus on how to gain a safe, permanent place to live. This is your work, and we will support you in identifying and applying your strengths.',
  },
  {
    number: '04',
    title: 'Definitions Matter',
    text: 'Couch-surfing and living doubled up is not the same as "homeless." Homeless, as used at Genesis Garden, means you are sleeping on the street, living in a vehicle, or an abandoned building. Domestic violence situations are also addressed.',
  },
  {
    number: '05',
    title: 'Be Open With Us',
    text: 'When you call to be added to our list, please be upfront and honest about your situation and history. We know it can be hard to talk about, but we are best able to support you when we understand your story. We care about what\'s happened to you.',
  },
];

function Home() {
  const [missionRef, missionInView] = useInView();
  const [knowRef, knowInView] = useInView({ threshold: 0.05 });
  const [impactRef, impactInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <>
      <SEOHead
        title="Genesis Garden | Safe, Stable Housing in Western Illinois"
        description="Genesis Garden provides emergency shelter, eviction prevention, and permanent housing solutions in McDonough, Hancock, Henderson, and Warren Counties in Western Illinois."
      />

      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <img
            src="/images/Enhanced-Family_Hero.webp"
            alt=""
            className="hero__bg-image"
            loading="eager"
          />
          <div className="hero__bg-overlay" />
        </div>

        {/* Floating botanical elements */}
        <div className="hero__botanicals" aria-hidden="true">
          <svg className="hero__leaf hero__leaf--1" viewBox="0 0 40 60" fill="none">
            <path d="M20 0C20 0 0 20 0 40C0 51 9 60 20 60C31 60 40 51 40 40C40 20 20 0 20 0Z" fill="rgba(82,183,136,0.12)"/>
            <path d="M20 10V55M20 25C14 22 8 28 8 35M20 35C26 32 32 38 32 42" stroke="rgba(82,183,136,0.2)" strokeWidth="1"/>
          </svg>
          <svg className="hero__leaf hero__leaf--2" viewBox="0 0 40 60" fill="none">
            <path d="M20 0C20 0 0 20 0 40C0 51 9 60 20 60C31 60 40 51 40 40C40 20 20 0 20 0Z" fill="rgba(212,163,115,0.1)"/>
            <path d="M20 10V55M20 25C14 22 8 28 8 35M20 35C26 32 32 38 32 42" stroke="rgba(212,163,115,0.15)" strokeWidth="1"/>
          </svg>
          <svg className="hero__leaf hero__leaf--3" viewBox="0 0 30 45" fill="none">
            <path d="M15 0C15 0 0 15 0 30C0 38 7 45 15 45C23 45 30 38 30 30C30 15 15 0 15 0Z" fill="rgba(82,183,136,0.08)"/>
          </svg>
        </div>

        <div className="container hero__container">
          <div className="hero__content">
            <div className="hero__badge animate-fade-in">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Serving Western Illinois
            </div>
            <h1 className="hero__title animate-fade-in-up">
              Cultivating Hope,<br />
              <span className="hero__title-accent">Empowering Dreams</span>
            </h1>
            <p className="hero__subtitle animate-fade-in-up delay-1">
              Empowering our community with safe, stable, and affordable housing options
              for individuals and families across McDonough, Hancock, Henderson, and Warren Counties.
            </p>
            <div className="hero__actions animate-fade-in-up delay-2">
              <Link to="/housing-services" className="btn btn--accent btn--lg">
                Our Services
              </Link>
              <a href="tel:3093263075" className="btn btn--outline-white btn--lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                309-326-3075
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator" aria-hidden="true">
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ===== Mission Strip ===== */}
      <section className="mission-strip" ref={missionRef}>
        <div className="container">
          <div className={`mission-strip__grid${missionInView ? ' mission-strip__grid--visible' : ''}`}>
            <div className="mission-strip__item glass-card">
              <div className="mission-strip__icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <h3>Emergency Shelter</h3>
              <p>Immediate safe housing when you need it most</p>
            </div>
            <div className="mission-strip__item glass-card">
              <div className="mission-strip__icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Eviction Prevention</h3>
              <p>Resources and support to keep you in your home</p>
            </div>
            <div className="mission-strip__item glass-card">
              <div className="mission-strip__icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Permanent Housing</h3>
              <p>Long-term solutions for lasting stability</p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-off-white)" />

      {/* ===== Things to Know ===== */}
      <section className="section section--alt" id="things-to-know">
        <div className="container" ref={knowRef}>
          <div className="section-header">
            <h2>Things to Know</h2>
            <p>
              If you are considering seeking assistance, here are some important things to keep in mind.
            </p>
          </div>
          <div className="know-list">
            {thingsToKnow.map((item, i) => (
              <article
                key={item.number}
                className={`know-card reveal${i % 2 === 0 ? '' : ' reveal--right'}${knowInView ? ' reveal--visible' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="know-card__number" aria-hidden="true">{item.number}</span>
                <div className="know-card__content">
                  <h3 className="know-card__title">{item.title}</h3>
                  <p className="know-card__text">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-cream)" />

      {/* ===== Impact Numbers ===== */}
      <section className="section impact-section" ref={impactRef}>
        <div className="container">
          <div className="section-header">
            <h2>Our Impact</h2>
            <p>Making a difference across Western Illinois since 2010.</p>
          </div>
          <div className={`impact-grid${impactInView ? ' impact-grid--visible' : ''}`}>
            <div className="impact-stat">
              <div className="impact-stat__number gradient-text">
                <AnimatedCounter end={4} suffix="" />
              </div>
              <p className="impact-stat__label">Counties Served</p>
              <p className="impact-stat__detail">McDonough, Hancock, Henderson & Warren</p>
            </div>
            <div className="impact-stat">
              <div className="impact-stat__number gradient-text">
                <AnimatedCounter end={new Date().getFullYear() - 2010} suffix="+" />
              </div>
              <p className="impact-stat__label">Years of Service</p>
              <p className="impact-stat__detail">Founded in 2010 after the Shade Tree Mobile Park evictions</p>
            </div>
            <div className="impact-stat">
              <div className="impact-stat__number gradient-text">
                <AnimatedCounter end={5} suffix="" />
              </div>
              <p className="impact-stat__label">Housing Programs</p>
              <p className="impact-stat__detail">From emergency shelter to permanent housing</p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="organic" color="var(--color-primary-dark)" />

      {/* ===== CTA Section ===== */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-section__bg" aria-hidden="true">
          <img
            src="/images/Geness_House_Winter.png"
            alt=""
            className="cta-section__bg-image"
            loading="lazy"
          />
          <div className="cta-section__bg-overlay" />
        </div>
        <div className={`container cta-section__content${ctaInView ? ' cta-section__content--visible' : ''}`}>
          <h2>Ready to Talk?</h2>
          <p>
            To talk with us about your housing issues — emergency housing, eviction prevention,
            diversion, and more — call Genesis Garden. Please leave a message if we can't answer,
            and we will call or text you in response.
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

export default Home;

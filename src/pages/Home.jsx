import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import AnimatedCounter from '../components/AnimatedCounter';
import useInView from '../hooks/useInView';
import content from '../content/home.json';
import site from '../content/site.json';
import './Home.css';

const MISSION_ICONS = {
  house: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
};

function Home() {
  const [missionRef, missionInView] = useInView();
  const [knowRef, knowInView] = useInView({ threshold: 0.05 });
  const [impactRef, impactInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  const { hero, missionStrip, thingsToKnow, impact, cta } = content;

  return (
    <>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
      />

      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <img
            src={hero.backgroundImage}
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
              {hero.badge}
            </div>
            <h1 className="hero__title animate-fade-in-up">
              {hero.titleLine1}<br />
              <span className="hero__title-accent">{hero.titleAccent}</span>
            </h1>
            <p className="hero__subtitle animate-fade-in-up delay-1">
              {hero.subtitle}
            </p>
            <div className="hero__actions animate-fade-in-up delay-2">
              <Link to={hero.primaryButtonTo} className="btn btn--accent btn--lg">
                {hero.primaryButtonLabel}
              </Link>
              <a href={site.phoneHref} className="btn btn--outline-white btn--lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {site.phone}
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
            {missionStrip.map((item) => (
              <div className="mission-strip__item glass-card" key={item.title}>
                <div className="mission-strip__icon-wrap">
                  {MISSION_ICONS[item.icon]}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-off-white)" />

      {/* ===== Things to Know ===== */}
      <section className="section section--alt" id="things-to-know">
        <div className="container" ref={knowRef}>
          <div className="section-header">
            <h2>{thingsToKnow.heading}</h2>
            <p>
              {thingsToKnow.intro}
            </p>
          </div>
          <div className="know-list">
            {thingsToKnow.items.map((item, i) => (
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
            <h2>{impact.heading}</h2>
            <p>{impact.subtitle}</p>
          </div>
          <div className={`impact-grid${impactInView ? ' impact-grid--visible' : ''}`}>
            {impact.stats.map((stat) => (
              <div className="impact-stat" key={stat.label}>
                <div className="impact-stat__number gradient-text">
                  <AnimatedCounter
                    end={stat.end ?? new Date().getFullYear() - site.foundedYear}
                    suffix={stat.suffix ?? '+'}
                  />
                </div>
                <p className="impact-stat__label">{stat.label}</p>
                <p className="impact-stat__detail">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider shape="organic" color="var(--color-primary-dark)" />

      {/* ===== CTA Section ===== */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-section__bg" aria-hidden="true">
          <img
            src={cta.backgroundImage}
            alt=""
            className="cta-section__bg-image"
            loading="lazy"
          />
          <div className="cta-section__bg-overlay" />
        </div>
        <div className={`container cta-section__content${ctaInView ? ' cta-section__content--visible' : ''}`}>
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

export default Home;

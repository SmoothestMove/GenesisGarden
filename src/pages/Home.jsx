import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import AnimatedCounter from '../components/AnimatedCounter';
import DonationPrompt from '../components/DonationPrompt';
import useInView from '../hooks/useInView';
import useParallax from '../hooks/useParallax';
import useRipple from '../hooks/useRipple';
import useActiveStage from '../hooks/useActiveStage';
import content from '../content/home.json';
import site from '../content/site.json';
import aboutContent from '../content/about.json';
import donateContent from '../content/donate.json';
import partnersContent from '../content/partners.json';
import './Home.css';

const GET_HELP_ICONS = {
  house: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

const HELP_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const PARTNER_ICONS = {
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
};

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function Home() {
  const [getHelpRef, getHelpInView] = useInView();
  const [storyRef, storyInView] = useInView();
  const [splitRef, splitInView] = useInView();
  const [teamRef, teamInView] = useInView();
  const [knowRef, knowInView] = useInView({ threshold: 0.05 });
  const [impactRef, impactInView] = useInView();
  const [ctaRef, ctaInView] = useInView();
  const heroParallaxRef = useParallax();
  const ripple = useRipple();
  const { active: activeStage, setRef: setStageRef } = useActiveStage();

  const { hero, getHelp, story, team, wantToHelp, wantToPartner, thingsToKnow, impact, cta } = content;
  const featuredPartners = partnersContent.partners.slice(0, 3);

  return (
    <>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
      />

      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" ref={heroParallaxRef}>
          {/* Responsive variants are pre-generated via `npm run generate:hero`
              (scripts/generate-responsive-image.mjs). Re-run it after the CMS
              swaps hero.backgroundImage, or these -Nw.webp candidates 404. */}
          <img
            src={hero.backgroundImage}
            srcSet={`${hero.backgroundImage.replace(/\.webp$/, '-640w.webp')} 640w, ${hero.backgroundImage.replace(/\.webp$/, '-960w.webp')} 960w, ${hero.backgroundImage.replace(/\.webp$/, '-1280w.webp')} 1280w, ${hero.backgroundImage.replace(/\.webp$/, '-1920w.webp')} 1920w, ${hero.backgroundImage.replace(/\.webp$/, '-2560w.webp')} 2560w, ${hero.backgroundImage} 4096w`}
            sizes="100vw"
            alt=""
            className="hero__bg-image"
            loading="eager"
            fetchPriority="high"
            width="4096"
            height="2288"
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
            <p className="hero__kicker animate-fade-in">{hero.kicker}</p>
            <h1 className="hero__title animate-fade-in-up">
              {hero.titleLine1}<br />
              <span className="hero__title-accent">{hero.titleAccent}</span>
            </h1>
            <p className="hero__subtitle animate-fade-in-up delay-1">
              {hero.subtitle}
            </p>
            <div className="hero__actions animate-fade-in-up delay-2">
              {hero.ctas.map((item) => (
                <Link key={item.label} to={item.to} className={`btn ${item.style} btn--lg`} onClick={ripple}>
                  {item.label}
                </Link>
              ))}
            </div>
            <a href={site.phoneHref} className="hero__phone">
              or call {site.phone}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator" aria-hidden="true">
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ===== Get Help ===== */}
      <section className="get-help" id="get-help" ref={getHelpRef}>
        <div className="container">
          <div className="get-help__panel">
            <div className="get-help__header">
              <h2>{getHelp.heading}</h2>
              <p>{getHelp.intro}</p>
            </div>
            <div className="get-help__list">
              {getHelp.items.map((item, i) => (
                <Link
                  to={item.linkTo}
                  className={`get-help__item reveal${getHelpInView ? ' reveal--visible' : ''}`}
                  key={item.prompt}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <span className="get-help__icon icon-container" aria-hidden="true">
                    {GET_HELP_ICONS[item.icon]}
                  </span>
                  <span className="get-help__body">
                    <span className="get-help__prompt">{item.prompt}</span>
                    <span className="get-help__detail">{item.detail}</span>
                    <span className="get-help__link-label">
                      {item.linkLabel}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            <p className="get-help__closing">{getHelp.closingNote}</p>
          </div>
        </div>
      </section>

      {/* ===== Story — editorial split ===== */}
      <section className="story-section" ref={storyRef}>
        <div className={`story-section__media reveal--left${storyInView ? ' reveal--visible' : ''}`}>
          <img src={story.image} alt="Genesis Garden campus" loading="lazy" />
        </div>
        <div className={`story-section__content reveal--right${storyInView ? ' reveal--visible' : ''}`}>
          <span className="story-section__eyebrow">{story.eyebrow}</span>
          <h2 className="story-section__quote gradient-text">{story.quote}</h2>
          <p className="story-section__text">{story.text}</p>
          <Link to={story.linkTo} className="story-section__link">
            {story.linkLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-off-white)" />

      {/* ===== Housing Journey (Things to Know) ===== */}
      <section className="section section--alt" id="things-to-know">
        <div className="container" ref={knowRef}>
          <div className="section-header">
            <h2>{thingsToKnow.heading}</h2>
            <p>{thingsToKnow.intro}</p>
          </div>
          <div className="journey">
            <div className="journey__line" aria-hidden="true" />
            {thingsToKnow.items.map((item, i) => (
              <div
                key={item.number}
                ref={setStageRef(i)}
                className={`journey__stage reveal${knowInView ? ' reveal--visible' : ''}${activeStage === i ? ' journey__stage--active' : ''}`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <span className="journey__marker" aria-hidden="true">{item.number}</span>
                <div className="journey__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-cream)" />

      {/* ===== Impact — proof point ===== */}
      <section className="impact-hero" ref={impactRef}>
        <div className="container">
          <p className="impact-hero__since">Since {site.foundedYear}</p>
          <div className={`impact-hero__stats${impactInView ? ' impact-hero__stats--visible' : ''}`}>
            {impact.stats.map((stat) => (
              <div className="impact-hero__stat" key={stat.label}>
                <div className="impact-hero__number gradient-text">
                  <AnimatedCounter
                    end={stat.end ?? new Date().getFullYear() - site.foundedYear}
                    suffix={stat.suffix ?? '+'}
                  />
                </div>
                <p className="impact-hero__label">{stat.label}</p>
                <p className="impact-hero__detail">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Want to help / Want to partner — split ===== */}
      <section className="split-help" ref={splitRef}>
        <div className="container">
          <div className={`split-help__grid${splitInView ? ' split-help__grid--visible' : ''}`}>
            <div className="split-help__col">
              <span className="split-help__icon icon-container" aria-hidden="true">{HELP_ICON}</span>
              <h2>{wantToHelp.heading}</h2>
              <p>{wantToHelp.text}</p>
              <ul className="split-help__list">
                <li>
                  {donateContent.financial.heading} — {donateContent.financial.intro}{' '}
                  {site.address.street}, {site.address.cityStateZip}
                </li>
                <li>{donateContent.goods.heading} — {donateContent.goods.intro}</li>
              </ul>
              <Link to={wantToHelp.linkTo} className="btn btn--outline">
                {wantToHelp.linkLabel}
              </Link>
            </div>
            <div className="split-help__col">
              <span className="split-help__icon icon-container" aria-hidden="true">{PARTNER_ICONS.globe}</span>
              <h2>{wantToPartner.heading}</h2>
              <p>{wantToPartner.text}</p>
              <ul className="split-help__partners">
                {featuredPartners.map((partner) => (
                  <li key={partner.name}>
                    <span className="split-help__partner-icon" aria-hidden="true">
                      {PARTNER_ICONS[partner.icon] || PARTNER_ICONS.building}
                    </span>
                    {partner.name}
                  </li>
                ))}
              </ul>
              <Link to={wantToPartner.linkTo} className="btn btn--outline">
                {wantToPartner.linkLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="organic" color="var(--color-primary-dark)" />

      {/* ===== Team preview ===== */}
      <section className="team-preview" ref={teamRef}>
        <div className="container">
          <div className="section-header">
            <h2>{team.heading}</h2>
            <p>{team.text}</p>
          </div>
          <div className={`team-preview__grid${teamInView ? ' team-preview__grid--visible' : ''}`}>
            {aboutContent.team.staff.map((person, i) => (
              <div className="team-avatar" key={person.name} style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="team-avatar__circle">{initials(person.name)}</span>
                <span className="team-avatar__name">{person.name}</span>
                <span className="team-avatar__role">{person.role}</span>
              </div>
            ))}
          </div>
          <div className="team-preview__link-wrap">
            <Link to={team.linkTo} className="team-preview__link">
              {team.linkLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

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
            <a href={site.phoneHref} className="btn btn--accent btn--lg btn--glow" onClick={ripple}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {site.phone}
            </a>
            <Link to={cta.secondaryButtonTo} className="btn btn--outline-white btn--lg" onClick={ripple}>
              {cta.secondaryButtonLabel}
            </Link>
          </div>
        </div>
      </section>

      <DonationPrompt />
    </>
  );
}

export default Home;

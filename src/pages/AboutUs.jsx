import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import AnimatedCounter from '../components/AnimatedCounter';
import useInView from '../hooks/useInView';
import content from '../content/about.json';
import './AboutUs.css';

const VALUE_ICON_PROPS = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' };

const VALUE_ICONS = {
  plus: (
    <svg {...VALUE_ICON_PROPS}>
      <path d="M12 2v20M2 12h20" strokeLinecap="round" />
    </svg>
  ),
  people: (
    <svg {...VALUE_ICON_PROPS}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  heart: (
    <svg {...VALUE_ICON_PROPS}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  shield: (
    <svg {...VALUE_ICON_PROPS}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  leaf: (
    <svg {...VALUE_ICON_PROPS}>
      <path d="M12 2s-8 4.5-8 11a8 8 0 0 0 16 0c0-6.5-8-11-8-11z" />
    </svg>
  ),
};

const HISTORY_ICONS = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  house: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    </svg>
  ),
};

function AboutUs() {
  const [originRef, originInView] = useInView();
  const [mvRef, mvInView] = useInView();
  const [valRef, valInView] = useInView();
  const [teamRef, teamInView] = useInView();
  const [histRef, histInView] = useInView();

  const { hero, missionVision, values, team, history, volunteers } = content;
  const [originStory, ...remainingHistory] = history.items;

  return (
    <>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">{hero.heading}</h1>
          <p className="animate-fade-in-up delay-1">
            {hero.text}
          </p>
        </div>
      </section>

      {/* Origin Story — promoted out of the History timeline into a full narrative moment */}
      <section className="story-section" ref={originRef}>
        <div className={`story-section__media reveal--left${originInView ? ' reveal--visible' : ''}`}>
          <img src={team.image} alt="Genesis Garden campus" loading="lazy" />
        </div>
        <div className={`story-section__content reveal--right${originInView ? ' reveal--visible' : ''}`}>
          <span className="story-section__eyebrow">Where it started</span>
          <p className="story-section__quote gradient-text">Every garden begins somewhere.</p>
          <p className="story-section__text">{originStory.text}</p>
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-cream)" />

      {/* Mission, Vision */}
      <section className="section" ref={mvRef}>
        <div className="container">
          <div className={`about-mv-grid${mvInView ? ' about-mv-grid--visible' : ''}`}>
            <div className="about-mv-card about-mv-card--mission">
              <div className="about-mv-card__label">{missionVision.missionLabel}</div>
              <h2>{missionVision.missionHeading}</h2>
            </div>
            <div className="about-mv-card about-mv-card--vision">
              <div className="about-mv-card__label">{missionVision.visionLabel}</div>
              <h2>{missionVision.visionHeading}</h2>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-off-white)" />

      {/* Values */}
      <section className="section section--alt" ref={valRef}>
        <div className="container">
          <div className="section-header">
            <h2>{values.heading}</h2>
          </div>
          <div className={`values-row${valInView ? ' values-row--visible' : ''}`}>
            {values.items.map((value, i) => (
              <div
                key={value.title}
                className="value-chip"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="value-chip__icon" aria-hidden="true">
                  {VALUE_ICONS[value.icon]}
                </span>
                <span className="value-chip__label">{value.title}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', color: 'var(--color-gray-600)' }}>
            {values.note}
          </p>
        </div>
      </section>

      {/* Team — Split Layout with Image */}
      <section className="section about-team-section" ref={teamRef}>
        <div className="container">
          <div className={`about-team-grid${teamInView ? ' about-team-grid--visible' : ''}`}>
            <div className="about-team-grid__image">
              <img
                src={team.image}
                alt="Genesis Garden campus"
                loading="lazy"
              />
            </div>
            <div className="about-team-grid__content">
              <h2>{team.staffHeading}</h2>
              <ul className="about-team-list">
                {team.staff.map((person) => (
                  <li key={person.name}>
                    <strong>{person.name}</strong>
                    <span>{person.role}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontStyle: 'italic', color: 'var(--color-gray-600)', marginTop: 'var(--space-3)' }}>
                In memory of{' '}
                <a href={team.inMemoryUrl} target="_blank" rel="noopener noreferrer">
                  {team.inMemoryName}
                </a>.
              </p>

              <h2 style={{ marginTop: 'var(--space-8)' }}>{team.directorsHeading}</h2>
              <ul className="about-team-list">
                {team.directors.map((person) => (
                  <li key={person.name}>
                    <strong>{person.name}</strong>
                    {person.role && <span>{person.role}</span>}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 'var(--space-3)' }}>{team.foundingPresident}</p>
              <p style={{ marginTop: 'var(--space-4)' }}>
                <a href="/partners" className="footer__link" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                  {team.partnersLinkLabel} &rarr;
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
            {remainingHistory.map((item) => (
              <div className="about-block about-block--timeline" key={item.heading}>
                <div className="about-block__marker" aria-hidden="true">
                  {HISTORY_ICONS[item.icon]}
                </div>
                <h2>{item.heading}</h2>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider shape="curve" color="var(--color-cream)" />

      {/* Service Members & Volunteers */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{volunteers.heading}</h2>
          </div>
          <p>{renderBoldText(volunteers.current)}</p>

          <details className="about-volunteers-history">
            <summary>{volunteers.pastSummary}</summary>
            <div className="about-volunteers-history__body">
              {volunteers.pastBody.split('\n\n').map((paragraph, i) => (
                <p key={i}>{renderBoldText(paragraph)}</p>
              ))}
            </div>
          </details>
        </div>
      </section>
    </>
  );
}

function renderBoldText(text) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

export default AboutUs;

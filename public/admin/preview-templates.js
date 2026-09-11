/* Live preview templates for the Decap CMS admin editor (/admin).
 *
 * These render a styled approximation of the real Home and Housing
 * Services pages next to the edit form, using Decap's built-in
 * proportional scroll-sync (no code needed for that — it's automatic
 * once a preview template exists). There is no per-field highlight;
 * Decap CMS has no supported API for that (see the commit that added
 * this file for the investigation).
 *
 * Written as JSX. index.html fetches this file's source, transpiles it
 * with Babel's "automatic" JSX runtime (compiles <div/> to calls
 * imported from "react/jsx-runtime" rather than a global
 * React.createElement — React 19, which decap-cms@3 bundles
 * internally, no longer ships a browser <script>-loadable build at
 * all), and executes the result as a real ES module so that import
 * resolves against the import map in index.html, pinned to the same
 * React major version Decap bundles.
 *
 * Every component here MUST be a plain function of props only — no
 * hooks. Only "react/jsx-runtime" is import-mapped (for building
 * element objects), not "react" itself, so useState/useEffect/etc.
 * aren't even available to import — which is fine, since all data
 * here comes from the `entry` prop with no need for local state.
 */

/* ---------- shared icon sets (kept in sync by hand with the matching
   ICON_MAP objects in src/pages/Home.jsx and HousingServices.jsx) ---------- */

const MISSION_ICONS = {
  house: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

const SERVICE_ICON_PROPS = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' };

const SERVICE_ICONS = {
  exchange: (
    <svg {...SERVICE_ICON_PROPS}>
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  shield: (
    <svg {...SERVICE_ICON_PROPS}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  house: (
    <svg {...SERVICE_ICON_PROPS}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  target: (
    <svg {...SERVICE_ICON_PROPS}>
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  heart: (
    <svg {...SERVICE_ICON_PROPS}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  calendar: (
    <svg {...SERVICE_ICON_PROPS}>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
};

/* ---------- small helpers ---------- */

// Immutable.js List/Map -> plain JS, with a fallback for an empty/missing field.
function toJS(value, fallback) {
  return value && typeof value.toJS === 'function' ? value.toJS() : (value ?? fallback);
}

function getData(entry, path, fallback) {
  return toJS(entry.getIn(['data', ...path]), fallback);
}

function EmptyNote({ children }) {
  return <p className="ggp-empty-note">{children}</p>;
}

/* ---------- visual primitives ---------- */

function Section({ alt, children }) {
  return (
    <section className={`ggp-section${alt ? ' ggp-section--alt' : ''}`}>
      <div className="ggp-container">{children}</div>
    </section>
  );
}

function SectionHeader({ heading, subtitle }) {
  if (!heading && !subtitle) return null;
  return (
    <div className="ggp-section-header">
      {heading && <h2>{heading}</h2>}
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function IconCardGrid({ items, icons, textKey = 'text' }) {
  if (!items || items.length === 0) return <EmptyNote>No items yet.</EmptyNote>;
  return (
    <div className="ggp-grid">
      {items.map((item, i) => (
        <div className="ggp-card" key={i}>
          <div className="ggp-card__icon">{icons[item.icon] || null}</div>
          <h3>{item.title}</h3>
          <p>{item[textKey]}</p>
        </div>
      ))}
    </div>
  );
}

function CtaBand({ heading, text, buttonLabel }) {
  if (!heading && !text) return null;
  return (
    <div className="ggp-cta">
      {heading && <h2>{heading}</h2>}
      {text && <p>{text}</p>}
      {buttonLabel && <span className="ggp-btn">{buttonLabel}</span>}
    </div>
  );
}

/* ---------- Home preview ---------- */

function HomePreview({ entry }) {
  const hero = getData(entry, ['hero'], {});
  const missionStrip = getData(entry, ['missionStrip'], []);
  const thingsToKnow = getData(entry, ['thingsToKnow'], {});
  const impact = getData(entry, ['impact'], {});
  const cta = getData(entry, ['cta'], {});

  return (
    <div className="ggp">
      <div
        className="ggp-home-hero"
        style={hero.backgroundImage ? { backgroundImage: `linear-gradient(180deg, rgba(27,67,50,0.75) 0%, rgba(27,67,50,0.6) 40%, rgba(27,27,27,0.85) 100%), url(${hero.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        {hero.badge && <span className="ggp-home-hero__badge">{hero.badge}</span>}
        <h1>
          {hero.titleLine1}
          {hero.titleAccent && <span className="ggp-accent">{hero.titleAccent}</span>}
        </h1>
        {hero.subtitle && <p>{hero.subtitle}</p>}
        {hero.primaryButtonLabel && <span className="ggp-btn">{hero.primaryButtonLabel}</span>}
      </div>

      <Section>
        <IconCardGrid items={missionStrip} icons={MISSION_ICONS} />
      </Section>

      <Section alt>
        <SectionHeader heading={thingsToKnow.heading} subtitle={thingsToKnow.intro} />
        {thingsToKnow.items && thingsToKnow.items.length > 0 ? (
          <div className="ggp-know-list">
            {thingsToKnow.items.map((item, i) => (
              <div className="ggp-know-card" key={i}>
                <div className="ggp-know-card__number">{item.number}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyNote>No items yet.</EmptyNote>
        )}
      </Section>

      <Section>
        <SectionHeader heading={impact.heading} subtitle={impact.subtitle} />
        {impact.stats && impact.stats.length > 0 ? (
          <div className="ggp-stats">
            {impact.stats.map((stat, i) => (
              <div key={i}>
                <div className="ggp-stats__number">{stat.end != null ? `${stat.end}${stat.suffix || ''}` : '—'}</div>
                <div className="ggp-stats__label">{stat.label}</div>
                <div className="ggp-stats__detail">{stat.detail}</div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyNote>No stats yet.</EmptyNote>
        )}
      </Section>

      <CtaBand heading={cta.heading} text={cta.text} buttonLabel={cta.secondaryButtonLabel} />
    </div>
  );
}

/* ---------- Housing Services preview ---------- */

function HousingServicesPreview({ entry }) {
  const hero = getData(entry, ['hero'], {});
  const intro = getData(entry, ['intro'], {});
  const services = getData(entry, ['services'], {});
  const eligibility = getData(entry, ['eligibility'], {});
  const otherActivities = getData(entry, ['otherActivities'], {});
  const cta = getData(entry, ['cta'], {});

  return (
    <div className="ggp">
      <div className="ggp-hero">
        <h1>{hero.heading}</h1>
        {hero.text && <p>{hero.text}</p>}
      </div>

      <Section>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          {intro.heading && <h2>{intro.heading}</h2>}
          {intro.paragraph1 && <p>{intro.paragraph1}</p>}
          {intro.highlight && <p style={{ fontWeight: 700, fontSize: 'var(--fs-xl)', color: 'var(--color-primary)' }}>{intro.highlight}</p>}
          {intro.paragraph2 && <p>{intro.paragraph2}</p>}
        </div>
      </Section>

      <Section alt>
        <SectionHeader heading={services.heading} subtitle={services.subtitle} />
        <IconCardGrid items={services.items} icons={SERVICE_ICONS} textKey="description" />
      </Section>

      <Section>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {eligibility.heading && <h2>{eligibility.heading}</h2>}
          {eligibility.intro && <p>{eligibility.intro}</p>}
          {eligibility.items && eligibility.items.length > 0 && (
            <ul className="ggp-checklist">
              {eligibility.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          )}
        </div>
      </Section>

      {(otherActivities.title || otherActivities.text) && (
        <Section alt>
          <SectionHeader heading={otherActivities.heading} />
          <div className="ggp-card" style={{ maxWidth: 380, margin: '0 auto' }}>
            <div className="ggp-card__icon">{SERVICE_ICONS[otherActivities.icon] || null}</div>
            <h3>{otherActivities.title}</h3>
            <p>{otherActivities.text}</p>
            {otherActivities.linkLabel && <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{otherActivities.linkLabel} →</p>}
          </div>
        </Section>
      )}

      <CtaBand heading={cta.heading} text={cta.text} buttonLabel={cta.secondaryButtonLabel} />
    </div>
  );
}

CMS.registerPreviewStyle('/admin/preview.css');
CMS.registerPreviewTemplate('home', HomePreview);
CMS.registerPreviewTemplate('housing-services', HousingServicesPreview);

import SEOHead from '../components/SEOHead';
import SectionDivider from '../components/SectionDivider';
import useInView from '../hooks/useInView';
import './SummerMeals.css';

const sites = [
  { name: 'Colchester City Hall', address: '500 E Roberts St, Colchester', schedule: 'June to mid-August. Days and times to be announced.' },
  { name: 'Bushnell and Bardolph', address: '', schedule: 'June to mid-August. Days and times to be announced.' },
  { name: 'Macomb Middle School', address: '1500 S Johnson, Macomb', schedule: 'June 26 – mid-August. Days and times to be announced.' },
];

function SummerMeals() {
  const [gridRef, gridInView] = useInView();

  return (
    <>
      <SEOHead
        title="Summer Meals To-Go | Genesis Garden"
        description="Free summer meals for children and youth ages 1-18 in McDonough County, Illinois, through the ISBE/USDA Summer Food Service Program."
      />

      <section className="page-hero">
        <div className="container">
          <h1 className="animate-fade-in-up">Summer Meals To-Go</h1>
          <p className="animate-fade-in-up delay-1">
            Free meals for children and youth ages 1–18 through the ISBE/USDA Summer Food
            Service Program (SFSP).
          </p>
        </div>
      </section>

      <SectionDivider shape="wave" color="var(--color-cream)" />

      <section className="section" ref={gridRef}>
        <div className="container">
          <div className="summer-notice">
            <strong>Content note:</strong> Genesis Garden's own site still lists each pickup
            site's days and times as "to be announced" and the sign-up form and menus as
            "coming soon" — that live copy is reproduced below unchanged rather than filled in
            or guessed at. Genesis Garden should update this page each spring with confirmed
            schedules before the season begins.
          </div>

          <p>
            From June through August 2026, Genesis Garden offered free summer meals for
            children and youth ages 1–18 through the ISBE/USDA SFSP program. Multiple days of
            breakfasts and lunches were available at several sites in McDonough County,
            Illinois for pickup by children, or by parents, guardians, and caregivers.
          </p>

          <h2 style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-5)' }}>
            Tentative 2026 sites
          </h2>
          <div className={`summer-sites${gridInView ? ' summer-sites--visible' : ''}`}>
            {sites.map((site) => (
              <div className="card summer-site-card" key={site.name}>
                <h3 className="card__title">{site.name}</h3>
                {site.address && <p className="summer-site-card__address">{site.address}</p>}
                <p>{site.schedule}</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 'var(--space-6)' }}>Sign-up form and menus coming soon.</p>
        </div>
      </section>

      <SectionDivider shape="tilt" color="var(--color-primary-dark)" />

      <section className="cta-section">
        <div className="cta-section__bg" aria-hidden="true">
          <div className="cta-section__bg-overlay" />
        </div>
        <div className="container cta-section__content cta-section__content--visible">
          <h2>Questions about Summer Meals?</h2>
          <p>Call or text Genesis Garden and we'll get back to you.</p>
          <div className="cta-section__actions">
            <a href="tel:3093263075" className="btn btn--accent btn--lg btn--glow">
              309-326-3075
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default SummerMeals;

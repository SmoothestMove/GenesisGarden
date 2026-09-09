import './SectionDivider.css';

const shapes = {
  wave: (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z" />
    </svg>
  ),
  curve: (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,80 Q720,0 1440,80 L1440,80 L0,80 Z" />
    </svg>
  ),
  tilt: (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
      <polygon points="0,60 1440,0 1440,60" />
    </svg>
  ),
  organic: (
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,50 C200,100 400,0 600,50 C800,100 1000,20 1200,60 C1350,80 1400,40 1440,50 L1440,100 L0,100 Z" />
    </svg>
  ),
};

function SectionDivider({ shape = 'wave', flip = false, color = 'var(--color-off-white)' }) {
  return (
    <div
      className={`section-divider${flip ? ' section-divider--flip' : ''}`}
      style={{ '--divider-fill': color }}
    >
      {shapes[shape] || shapes.wave}
    </div>
  );
}

export default SectionDivider;

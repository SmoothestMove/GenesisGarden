# Hero Image Carousel Perpetual Loop - Combined Plan

> **Last Updated**: 2026-10-27

---

## Implementation Plan

Transform the hero background carousel on the Genesis Garden home page into an uninterrupted perpetual loop that rotates continuously through all hero background images without manual navigation or indicator buttons, and maintain an inclusive, diverse suite of high-resolution hero slides.

### Key Objectives
1. **Perpetual Auto-Rotation**:
   - Establish a continuous rotation interval that transitions seamlessly through all slides in `slides` (`slides.length` items) in an infinite cycle.
   - Remove pause-on-hover behavior (`isPaused`, `onMouseEnter`, `onMouseLeave`) so the rotation never halts.
2. **Remove Manual Navigation & Controls**:
   - Eliminate indicator dots and button controls (`hero__controls`, `hero__indicators`, `hero__indicator`) from the Hero JSX.
   - Retain the clean, uncluttered visual aesthetic and hero scroll indicator.
   - Clean up obsolete styles in `Home.css`.
3. **Responsive Hero Assets**:
   - Optimize hero images into multi-resolution WebP variants (640w, 960w, 1280w, 1920w, 2560w, full) for optimal responsive performance and fidelity.
   - Incorporate `Chair_Hero` to highlight accessibility and inclusivity in Western Illinois community housing.
4. **Performance & Compliance**:
   - Ensure clean React Hook lifecycles (pure timer cleanup on unmount or slide change).
   - Use functional state updates to avoid stale closures.
   - Verify build passes with zero errors.

---

## Development Roadmap

- **~~Phase 1: Component Refactor (`Home.jsx`)~~**
  - Remove `isPaused` state and event handlers.
  - Simplify `useEffect` interval loop to run unconditionally whenever `slides.length > 1`.
  - Remove `<div className="hero__controls">` and `<button className="hero__indicator">` markup.
- **~~Phase 2: Style & Layout Cleanup (`Home.css`)~~**
  - Clean up obsolete indicator button styles while preserving smooth transitions and scroll indicator positioning.
- **~~Phase 3: Hero Slide Asset Expansion (`Chair_Hero`)~~**
  - Generate full WebP and responsive width variants for `Chair_Hero.jpg`.
  - Update `scripts/optimize-hero-images.mjs` with `Chair_Hero.jpg`.
  - Add `Chair_Hero.webp` slide configuration to `src/content/home.json` with appropriate focal point and compassionate accessibility alt text.
- **~~Phase 4: Verification & Testing~~**
  - Run `npm run build` to confirm no syntax or compilation issues.
  - Verify seamless perpetual transitions across all 7 slides.

---

## Task Checklist

### ~~Phase 1: Implementation~~
- [x] Update [Home.jsx](file:///d:/Design%20Projects/GenesisGarden/src/pages/Home.jsx) to perpetual rotation without pause listeners or navigation buttons
- [x] Clean up obsolete hero control styles in [Home.css](file:///d:/Design%20Projects/GenesisGarden/src/pages/Home.css)

### ~~Phase 2: Hero Asset Optimization & Content Update~~
- [x] Add `Chair_Hero.jpg` to [optimize-hero-images.mjs](file:///d:/Design%20Projects/GenesisGarden/scripts/optimize-hero-images.mjs)
  | `node scripts/optimize-hero-images.mjs` | → Generates WebP and responsive width variants for hero images
- [x] Add `Chair_Hero.webp` to `slides` in [home.json](file:///d:/Design%20Projects/GenesisGarden/src/content/home.json)

### ~~Phase 3: Verification~~
- [x] Run build check to verify syntax and assets
  | `npm run build` | → Test production bundle compilation

---

## Walkthrough

### Changes Summary
- **Uninterrupted Auto-Rotation**: Removed `isPaused` state and `onMouseEnter`/`onMouseLeave` event handlers from `<section className="hero">` in [Home.jsx](file:///d:/Design%20Projects/GenesisGarden/src/pages/Home.jsx). The `useEffect` now establishes an unconditional 6-second interval loop with proper cleanup:
  ```jsx
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);
  ```
- **Removed Manual Controls**: Removed the indicator buttons container (`hero__controls` and `hero__indicators`) from [Home.jsx](file:///d:/Design%20Projects/GenesisGarden/src/pages/Home.jsx).
- **CSS Cleanup**: Cleaned up the obsolete `.hero__controls`, `.hero__indicators`, and `.hero__indicator` classes from [Home.css](file:///d:/Design%20Projects/GenesisGarden/src/pages/Home.css), leaving the hero section clean and cinematic.
- **Chair_Hero Added to Rotation**:
  - Optimized `Chair_Hero.jpg` into `Chair_Hero.webp` (618 KB) along with responsive srcset variants: `640w` (45 KB), `960w` (89 KB), `1280w` (146 KB), `1920w` (298 KB), `2560w` (486 KB).
  - Configured in [home.json](file:///d:/Design%20Projects/GenesisGarden/src/content/home.json) with descriptive alt text (`"A smiling resident in a wheelchair on an accessibility ramp, representing dignified and inclusive housing in Western Illinois"`), focal point (`"center 25%"`), and max width (`2752`).
  - Total active slides in rotation: 7 slides.
- **Build Verification**: Production build completed successfully (`vite build`) with zero errors.

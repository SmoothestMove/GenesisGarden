import { useEffect, useRef } from 'react';

/**
 * useParallax — offsets an element's transform by a fraction of the page
 * scroll position, so it visually lags behind foreground content.
 * No-op under prefers-reduced-motion.
 */
export default function useParallax(speed = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    function apply() {
      // Clamp to the element's own height so the offset never grows past
      // the amount its CSS scale-up (see heroZoom/heroBgZoom) bleeds beyond
      // its bounds — otherwise a gap would appear at the trailing edge.
      const rect = element.getBoundingClientRect();
      const maxScroll = element.offsetHeight || window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), maxScroll);
      element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    }

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}

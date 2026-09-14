import { useEffect, useRef, useState } from 'react';

/**
 * useActiveStage — tracks which of a list of stage elements is currently
 * closest to the viewport's vertical center, for scroll-driven "which
 * step is active" UIs (e.g. a vertical journey/timeline).
 */
export default function useActiveStage() {
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      const viewportCenter = window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActive(closest);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  function setRef(i) {
    return (el) => {
      itemRefs.current[i] = el;
    };
  }

  return { active, setRef };
}

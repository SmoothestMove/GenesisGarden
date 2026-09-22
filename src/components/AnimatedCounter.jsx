import { useState, useRef, useEffect, useLayoutEffect } from 'react';

function canAnimate() {
  return (
    typeof IntersectionObserver !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * AnimatedCounter — counts up from 0 to `end` when scrolled into view.
 * The real value is in the initial markup (for crawlers and no-animation
 * cases) and is only reset to 0 before first paint when animation will run.
 */
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }) {
  const endVal = Number(end);
  const [count, setCount] = useState(endVal);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (!hasAnimated.current && canAnimate()) {
      setCount(0);
    } else {
      setCount(endVal);
    }
  }, [endVal]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !canAnimate()) return;

    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(element);

          const startTime = performance.now();

          function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * endVal));

            if (progress < 1) {
              frame = requestAnimationFrame(animate);
            }
          }

          frame = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      // If torn down mid-animation, settle on the real value
      if (hasAnimated.current) setCount(endVal);
    };
  }, [endVal, duration]);

  const finalLabel = `${prefix}${endVal.toLocaleString()}${suffix}`;

  return (
    <span ref={ref} className="animated-counter">
      <span className="sr-only">{finalLabel}</span>
      <span aria-hidden="true">{prefix}{count.toLocaleString()}{suffix}</span>
    </span>
  );
}

export default AnimatedCounter;

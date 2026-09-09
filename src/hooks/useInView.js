import { useState, useRef, useEffect } from 'react';

/**
 * useInView — triggers when an element scrolls into the viewport.
 * @param {Object} options
 * @param {string} options.threshold - Intersection ratio to trigger (0-1). Default 0.15.
 * @param {string} options.rootMargin - Margin around root. Default '0px 0px -60px 0px'.
 * @param {boolean} options.triggerOnce - Only trigger once. Default true.
 * @returns {[React.RefObject, boolean]}
 */
export default function useInView({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
}

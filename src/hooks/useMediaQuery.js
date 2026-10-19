import { useSyncExternalStore } from 'react';

/**
 * Subscribe to a CSS media query. Uses useSyncExternalStore so the value is
 * read straight from matchMedia — no setState-in-effect, safe under
 * concurrent rendering.
 */
function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export default useMediaQuery;

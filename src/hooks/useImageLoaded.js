import { useState, useRef, useEffect, useCallback } from 'react';

// Tracks whether an <img> has finished loading (or failed), so callers can
// show a skeleton placeholder until then. `.complete` becomes true on both
// success AND failure, so a mount-time check alone can't tell those apart;
// naturalWidth distinguishes a real decoded image from a failed one.
// onError is handled the same as onLoad — a broken image should clear the
// skeleton, not shimmer forever.
export default function useImageLoaded() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  const onSettle = useCallback(() => setLoaded(true), []);

  return { loaded, onLoad: onSettle, onError: onSettle, imgRef };
}

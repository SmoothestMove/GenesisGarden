import { useCallback } from 'react';

/**
 * useRipple — returns an onClick handler that spawns a Material-style
 * expanding ripple from the click point on the target element.
 * Target must have position:relative/absolute and overflow:hidden
 * (already true of the shared .btn class).
 */
export default function useRipple() {
  return useCallback((e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    const existing = button.getElementsByClassName('btn-ripple')[0];
    if (existing) existing.remove();

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - rect.left - radius}px`;
    ripple.style.top = `${e.clientY - rect.top - radius}px`;
    ripple.addEventListener('animationend', () => ripple.remove());

    button.appendChild(ripple);
  }, []);
}

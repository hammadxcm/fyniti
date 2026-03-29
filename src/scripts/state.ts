export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

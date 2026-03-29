export function initScrollReveal(): void {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!elements.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (const el of elements) {
      el.classList.add('visible');
    }
    return;
  }

  // Set stagger indices on children
  for (const parent of document.querySelectorAll('.stagger')) {
    Array.from(parent.children).forEach((child, i) => {
      (child as HTMLElement).style.setProperty('--stagger-index', String(i));
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
  );

  for (const el of elements) {
    observer.observe(el);
  }
}

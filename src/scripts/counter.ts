/**
 * Scroll-triggered animated number counter.
 * Elements with [data-counter] count from 0 → data-value on viewport entry.
 */

function easeOut(t: number): number {
  return 1 - (1 - t) ** 3;
}

function animateCounter(el: HTMLElement): void {
  const target = Number.parseInt(el.dataset.value || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function tick(now: number): void {
    const t = Math.min((now - start) / duration, 1);
    const current = Math.round(easeOut(t) * target);
    el.textContent = `${current}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function initCounters(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (els.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.3 },
  );

  for (const el of els) observer.observe(el);
}

import { getMorphPhase, RECT_PATHS } from './logo-morph';
import { isTouchDevice, prefersReducedMotion } from './state';

function randomRect(): string {
  const w = 8 + Math.random() * 48;
  const h = 8 + Math.random() * 68;
  const x = Math.random() * (360 - w);
  const y = Math.random() * (80 - h);
  return `M${x} ${y}L${x + w} ${y}L${x + w} ${y + h}L${x} ${y + h}Z`;
}

function shuffleIndices(len: number): number[] {
  const arr = Array.from({ length: len }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const FLICKER_MS = 45;
const RESOLVE_MS = 80;
const COUNT = RECT_PATHS.length;

export function initLogoScramble(): void {
  if (isTouchDevice || prefersReducedMotion) return;

  const svgEls = document.querySelectorAll<SVGElement>('.morph-svg');
  if (svgEls.length === 0) return;

  // Each SVG gets its own independent scramble state
  for (const svg of svgEls) {
    const wrap = svg.closest<HTMLElement>('.nav-logo-wrap, .logo-container');
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>('.morph-path'));
    if (!wrap || paths.length !== COUNT) continue;

    let isAnimating = false;
    let flickerTimer: number | null = null;
    let resolveTimer: number | null = null;

    function cleanup(): void {
      if (flickerTimer !== null) {
        clearInterval(flickerTimer);
        flickerTimer = null;
      }
      if (resolveTimer !== null) {
        clearInterval(resolveTimer);
        resolveTimer = null;
      }
      for (let i = 0; i < COUNT; i++) {
        paths[i].setAttribute('d', RECT_PATHS[i]);
      }
      isAnimating = false;
    }

    wrap.addEventListener('mouseenter', () => {
      if (isAnimating || getMorphPhase() !== 'fyniti') return;
      isAnimating = true;

      const resolved = new Array(COUNT).fill(false);
      const order = shuffleIndices(COUNT);
      let step = 0;

      flickerTimer = window.setInterval(() => {
        for (let i = 0; i < COUNT; i++) {
          if (!resolved[i]) {
            paths[i].setAttribute('d', randomRect());
          }
        }
      }, FLICKER_MS);

      resolveTimer = window.setInterval(() => {
        if (step < order.length) {
          const idx = order[step];
          resolved[idx] = true;
          paths[idx].setAttribute('d', RECT_PATHS[idx]);
          step++;
        } else {
          if (flickerTimer !== null) {
            clearInterval(flickerTimer);
            flickerTimer = null;
          }
          if (resolveTimer !== null) clearInterval(resolveTimer);
          resolveTimer = null;
          isAnimating = false;
        }
      }, RESOLVE_MS);
    });

    wrap.addEventListener('mouseleave', () => {
      if (isAnimating) cleanup();
    });
  }
}

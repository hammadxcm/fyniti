import { combine } from 'flubber';
import { prefersReducedMotion } from './state';

// FYNITI letter rects as SVG path strings (viewBox 0 0 360 80)
export const RECT_PATHS = [
  // F
  'M0 0L56 0L56 12L0 12Z',
  'M0 0L12 0L12 80L0 80Z',
  'M0 34L40 34L40 46L0 46Z',
  // Y
  'M76 0L88 0L88 28L76 28Z',
  'M120 0L132 0L132 28L120 28Z',
  'M86 22L100 22L100 34L86 34Z',
  'M108 22L122 22L122 34L108 34Z',
  'M96 32L112 32L112 80L96 80Z',
  // N
  'M152 0L164 0L164 80L152 80Z',
  'M208 0L220 0L220 80L208 80Z',
  'M164 8L176 8L176 22L164 22Z',
  'M174 20L186 20L186 34L174 34Z',
  'M184 32L196 32L196 46L184 46Z',
  'M196 44L208 44L208 58L196 58Z',
  // I
  'M240 0L252 0L252 80L240 80Z',
  // T
  'M272 0L328 0L328 12L272 12Z',
  'M294 0L306 0L306 80L294 80Z',
  // I
  'M348 0L360 0L360 80L348 80Z',
];

const LEFT_LOOP =
  'M180 40C153.8 24 127.5 8 90 8C56.9 8 30 22.3 30 40' +
  'C30 57.7 56.9 72 90 72C127.5 72 153.8 56 180 40Z';
const RIGHT_LOOP =
  'M180 40C206.3 24 232.5 8 270 8C303.1 8 330 22.3 330 40' +
  'C330 57.7 303.1 72 270 72C232.5 72 206.3 56 180 40Z';

const COUNT = RECT_PATHS.length;

const MORPH_DUR = 1_600;
const STAGGER = 50;
const HOLD_FYNITI_FIRST = 800;
const HOLD_FYNITI = 15_000;
const HOLD_INFINITY = 3_500;
const HOLLOW_THRESHOLD = 0.75;

function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

type Phase = 'fyniti' | 'morph-forward' | 'infinity' | 'morph-reverse';

let _phase: Phase = 'fyniti';
export function getMorphPhase(): Phase {
  return _phase;
}

interface SvgInstance {
  pathEls: SVGPathElement[];
  pulseEl: SVGPathElement | null;
}

export function initLogoMorph(): void {
  if (prefersReducedMotion) return;

  // Collect ALL morph SVGs (header + hero)
  const svgEls = document.querySelectorAll<SVGElement>('.morph-svg');
  if (svgEls.length === 0) return;

  const instances: SvgInstance[] = [];
  for (const svg of svgEls) {
    const pathEls = Array.from(svg.querySelectorAll<SVGPathElement>('.morph-path'));
    if (pathEls.length !== COUNT) continue;
    instances.push({
      pathEls,
      pulseEl: svg.querySelector<SVGPathElement>('.morph-pulse'),
    });
  }
  if (instances.length === 0) return;

  // Build interpolators once (shared across all instances)
  const mid = Math.ceil(COUNT / 2);
  let interpolators: Array<(t: number) => string>;
  try {
    const left = combine(RECT_PATHS.slice(0, mid), LEFT_LOOP, { maxSegmentLength: 2 });
    const right = combine(RECT_PATHS.slice(mid), RIGHT_LOOP, { maxSegmentLength: 2 });
    interpolators = [...left, ...right];
  } catch {
    return;
  }

  let phase: Phase = 'fyniti';
  let phaseStart = 0;
  let isFirst = true;

  function syncPhase(p: Phase): void {
    phase = p;
    _phase = p;
  }

  // Apply morph state to ALL instances simultaneously
  function setStaggered(elapsed: number, forward: boolean): boolean {
    let allDone = true;
    for (let i = 0; i < COUNT; i++) {
      const idx = forward ? i : COUNT - 1 - i;
      const rawT = Math.max(0, Math.min((elapsed - idx * STAGGER) / MORPH_DUR, 1));
      if (rawT < 1) allDone = false;

      const morphT = forward ? rawT : 1 - rawT;
      const eased = ease(morphT);
      const d = interpolators[i](eased);
      const isHollow = morphT > HOLLOW_THRESHOLD;

      for (const inst of instances) {
        inst.pathEls[i].setAttribute('d', d);
        inst.pathEls[i].classList.toggle('is-hollow', isHollow);
      }
    }
    return allDone;
  }

  function setAllHollow(on: boolean): void {
    for (const inst of instances) {
      for (let i = 0; i < COUNT; i++) {
        inst.pathEls[i].classList.toggle('is-hollow', on);
      }
      if (inst.pulseEl) inst.pulseEl.style.opacity = on ? '1' : '0';
    }
  }

  function tick(now: number): void {
    const elapsed = now - phaseStart;

    switch (phase) {
      case 'fyniti': {
        const hold = isFirst ? HOLD_FYNITI_FIRST : HOLD_FYNITI;
        if (elapsed >= hold) {
          syncPhase('morph-forward');
          phaseStart = now;
          isFirst = false;
        }
        break;
      }

      case 'morph-forward':
        if (setStaggered(elapsed, true)) {
          syncPhase('infinity');
          phaseStart = now;
          setAllHollow(true);
        }
        break;

      case 'infinity':
        if (elapsed >= HOLD_INFINITY) {
          syncPhase('morph-reverse');
          phaseStart = now;
          for (const inst of instances) {
            if (inst.pulseEl) inst.pulseEl.style.opacity = '0';
          }
        }
        break;

      case 'morph-reverse':
        if (setStaggered(elapsed, false)) {
          syncPhase('fyniti');
          phaseStart = now;
          setAllHollow(false);
        }
        break;
    }

    requestAnimationFrame(tick);
  }

  phaseStart = performance.now();
  requestAnimationFrame(tick);
}

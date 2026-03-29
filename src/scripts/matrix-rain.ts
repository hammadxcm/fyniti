/**
 * Matrix rain — katakana + hex characters falling in columns.
 * Active only on hacker (default) and matrix themes.
 * Ported from hammadxcm.
 */

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
const FONT_SIZE = 14;

// Theme → { color, bg, speed (lower = faster) }
const THEME_CONFIG: Record<string, { color: string; bg: string; speed: number }> = {
  '':       { color: 'rgba(0, 191, 191, 0.6)', bg: 'rgba(10, 14, 20, 0.06)', speed: 3 },
  hacker:   { color: 'rgba(0, 191, 191, 0.6)', bg: 'rgba(10, 14, 20, 0.06)', speed: 3 },
  matrix:   { color: 'rgba(0, 255, 65, 0.8)',  bg: 'rgba(0, 0, 0, 0.05)',    speed: 2 },
};

function getTheme(): string {
  return document.documentElement.getAttribute('data-theme') || '';
}

function isMatrixTheme(theme: string): boolean {
  return theme === '' || theme === 'hacker' || theme === 'matrix';
}

export function initMatrixRain(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let columns = 0;
  let drops: number[] = [];
  let frameCount = 0;
  let frameId: number | null = null;

  function resize(): void {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    columns = Math.floor(w / FONT_SIZE);
    drops = Array.from({ length: columns }, () => Math.random() * -100);
  }

  function draw(): void {
    const theme = getTheme();
    if (!isMatrixTheme(theme)) {
      ctx.clearRect(0, 0, w, h);
      canvas.style.opacity = '0';
      frameId = requestAnimationFrame(draw);
      return;
    }

    canvas.style.opacity = '0.7';
    const cfg = THEME_CONFIG[theme] || THEME_CONFIG[''];

    frameCount++;
    if (frameCount % cfg.speed !== 0) {
      frameId = requestAnimationFrame(draw);
      return;
    }

    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = cfg.color;
    ctx.font = `${FONT_SIZE}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      if (Math.random() > 0.3) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > h && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    frameId = requestAnimationFrame(draw);
  }

  function onVisibility(): void {
    if (document.hidden) {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    } else if (frameId === null) {
      frameId = requestAnimationFrame(draw);
    }
  }

  resize();
  frameId = requestAnimationFrame(draw);

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);
}

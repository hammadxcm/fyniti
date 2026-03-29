/**
 * Hero canvas — full effect system ported from hammadxcm.
 * 12 effects: particles, retroGrid, snowfall, bubbles, embers, starfield,
 * lightDust, fireflies, bloodRain, purpleParticles, neonSparks, cosmicDust.
 * Theme-reactive via data-theme attribute + --color-brand CSS var.
 */

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let w = 0;
let h = 0;
let frameId: number | null = null;
let initialized = false;
const isTouchDevice =
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const MOUSE_RADIUS = 150;
const CONNECT_DIST = 160;
const CELL_SIZE = CONNECT_DIST;
const mouse = { x: null as number | null, y: null as number | null };

function resize(): void {
  if (!canvas) return;
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
}

function getTheme(): string {
  return document.documentElement.getAttribute('data-theme') || '';
}

function getParticleColor(): string {
  const brand = getComputedStyle(document.documentElement).getPropertyValue('--color-brand').trim();
  const hex = brand.replace('#', '');
  if (hex.length === 6) {
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, `;
  }
  return 'rgba(0, 168, 168, ';
}

// Theme → canvas effect name
const THEME_EFFECT: Record<string, string> = {
  '': 'particles',
  hacker: 'particles',
  dracula: 'purpleParticles',
  nord: 'snowfall',
  catppuccin: 'bubbles',
  synthwave: 'retroGrid',
  matrix: 'particles',
  bloodmoon: 'bloodRain',
  midnight: 'starfield',
  arctic: 'lightDust',
  gruvbox: 'fireflies',
  cyberpunk: 'neonSparks',
  nebula: 'cosmicDust',
  solarized: 'lightDust',
  rosepine: 'fireflies',
  monokai: 'embers',
};

/* ── Unified Mote System ── */
interface Mote {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  drift: number;
  flicker: number;
  twinkle: number;
  speed: number;
  baseOpacity: number;
  glow: number;
  glowSpeed: number;
}

interface MoteConfig {
  count: (w: number, h: number) => number;
  spawn: (w: number, h: number) => Mote;
  update: (m: Mote, w: number, h: number) => void;
  draw: (ctx: CanvasRenderingContext2D, m: Mote, color: string) => void;
}

let motes: Mote[] = [];

function initMotes(cfg: MoteConfig): void {
  const base = cfg.count(w, h);
  const count = isTouchDevice ? Math.floor(base * 0.4) : base;
  motes = [];
  for (let i = 0; i < count; i++) motes.push(cfg.spawn(w, h));
}

function drawMotes(cfg: MoteConfig, color: string): void {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  for (const m of motes) {
    cfg.update(m, w, h);
    cfg.draw(ctx, m, color);
  }
}

const defaultMote = (): Partial<Mote> => ({
  drift: 0,
  flicker: 0,
  twinkle: 0,
  speed: 0,
  baseOpacity: 0,
  glow: 0,
  glowSpeed: 0,
});

/* ── 10 Mote Effects ── */

const snowfall: MoteConfig = {
  count: (w, h) => Math.min(120, Math.floor((w * h) / 8000)),
  spawn: (w, h) =>
    ({
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      vy: Math.random() * 1 + 0.3,
      vx: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
    }) as Mote,
  update: (m, w, h) => {
    m.y += m.vy;
    m.x += m.vx + Math.sin(m.y * 0.01) * 0.3;
    if (m.y > h) {
      m.y = -5;
      m.x = Math.random() * w;
    }
    if (m.x > w) m.x = 0;
    if (m.x < 0) m.x = w;
  },
  draw: (ctx, m, c) => {
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${m.opacity})`;
    ctx.fill();
  },
};

const bubbles: MoteConfig = {
  count: (w, h) => Math.min(50, Math.floor((w * h) / 20000)),
  spawn: (w, h) =>
    ({
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 20 + 5,
      vy: -(Math.random() * 0.5 + 0.1),
      vx: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.15 + 0.05,
    }) as Mote,
  update: (m, w, h) => {
    m.y += m.vy;
    m.x += m.vx;
    if (m.y < -m.r * 2) {
      m.y = h + m.r;
      m.x = Math.random() * w;
    }
  },
  draw: (ctx, m, c) => {
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.strokeStyle = `${c}${m.opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  },
};

const embers: MoteConfig = {
  count: (w, h) => Math.min(80, Math.floor((w * h) / 12000)),
  spawn: (w, h) =>
    ({
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      vy: -(Math.random() * 0.8 + 0.2),
      vx: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      flicker: Math.random() * Math.PI * 2,
    }) as Mote,
  update: (m, w, h) => {
    m.y += m.vy;
    m.x += m.vx + Math.sin(m.flicker) * 0.2;
    m.flicker += 0.02;
    if (m.y < -10) {
      m.y = h + 10;
      m.x = Math.random() * w;
    }
  },
  draw: (ctx, m, c) => {
    const osc = Math.sin(m.flicker) * 0.15 + 0.85;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${m.opacity * osc})`;
    ctx.fill();
  },
};

const starfield: MoteConfig = {
  count: (w, h) => Math.min(150, Math.floor((w * h) / 6000)),
  spawn: (w, h) =>
    ({
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      vx: 0,
      vy: 0,
      opacity: 0,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
      baseOpacity: Math.random() * 0.5 + 0.3,
    }) as Mote,
  update: (m) => {
    m.twinkle += m.speed;
  },
  draw: (ctx, m, c) => {
    const o = m.baseOpacity + Math.sin(m.twinkle) * 0.2;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${Math.max(0.1, o)})`;
    ctx.fill();
  },
};

const lightDust: MoteConfig = {
  count: (w, h) => Math.min(60, Math.floor((w * h) / 15000)),
  spawn: (w, h) =>
    ({
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      vy: (Math.random() - 0.5) * 0.3,
      vx: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.3 + 0.1,
      drift: Math.random() * Math.PI * 2,
    }) as Mote,
  update: (m, w, h) => {
    m.x += m.vx;
    m.y += m.vy + Math.sin(m.drift) * 0.1;
    m.drift += 0.01;
    if (m.x > w + 10) {
      m.x = -10;
      m.y = Math.random() * h;
    }
  },
  draw: (ctx, m, c) => {
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${m.opacity})`;
    ctx.fill();
  },
};

const fireflies: MoteConfig = {
  count: (w, h) => Math.min(40, Math.floor((w * h) / 25000)),
  spawn: (w, h) =>
    ({
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: 0,
      glow: Math.random() * Math.PI * 2,
      glowSpeed: Math.random() * 0.03 + 0.01,
    }) as Mote,
  update: (m, w, h) => {
    m.x += m.vx;
    m.y += m.vy;
    m.glow += m.glowSpeed;
    if (m.x < 0 || m.x > w) m.vx *= -1;
    if (m.y < 0 || m.y > h) m.vy *= -1;
  },
  draw: (ctx, m, c) => {
    const i = (Math.sin(m.glow) + 1) / 2;
    const o = i * 0.6 + 0.1;
    const r = m.r * (0.8 + i * 0.4);
    ctx.beginPath();
    ctx.arc(m.x, m.y, r * 3, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${o * 0.15})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${o})`;
    ctx.fill();
  },
};

const bloodRain: MoteConfig = {
  count: (w, h) => Math.min(120, Math.floor((w * h) / 8000)),
  spawn: (w, h) => {
    const d = Math.random();
    return {
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + d * 2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: 2 + d * 4,
      opacity: 0.15 + d * 0.45,
      speed: 8 + d * 25,
      drift: Math.random() * Math.PI * 2,
    } as Mote;
  },
  update: (m, w, h) => {
    m.y += m.vy;
    m.x += m.vx + Math.sin(m.drift) * 0.15;
    m.drift += 0.01;
    if (m.y > h + m.speed) {
      m.y = -(m.speed + Math.random() * 40);
      m.x = Math.random() * w;
    }
    if (m.x > w) m.x = 0;
    if (m.x < 0) m.x = w;
  },
  draw: (ctx, m, c) => {
    const tl = m.speed;
    const g = ctx.createLinearGradient(m.x, m.y - tl, m.x, m.y);
    g.addColorStop(0, `${c}0)`);
    g.addColorStop(0.6, `${c}${m.opacity * 0.5})`);
    g.addColorStop(1, `${c}${m.opacity})`);
    ctx.beginPath();
    ctx.moveTo(m.x, m.y - tl);
    ctx.lineTo(m.x, m.y);
    ctx.strokeStyle = g;
    ctx.lineWidth = m.r;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${m.opacity * 0.8})`;
    ctx.fill();
  },
};

const purpleParticles: MoteConfig = {
  count: (w, h) => Math.min(60, Math.floor((w * h) / 15000)),
  spawn: (w, h) =>
    ({
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
      drift: Math.random() * Math.PI * 2,
    }) as Mote,
  update: (m, w, h) => {
    m.x += m.vx + Math.sin(m.drift) * 0.1;
    m.y += m.vy + Math.cos(m.drift) * 0.1;
    m.drift += 0.005;
    if (m.x < 0 || m.x > w) m.vx *= -1;
    if (m.y < 0 || m.y > h) m.vy *= -1;
  },
  draw: (ctx, m, c) => {
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${m.opacity})`;
    ctx.fill();
  },
};

const neonSparks: MoteConfig = {
  count: (w, h) => Math.min(70, Math.floor((w * h) / 14000)),
  spawn: (w, h) => {
    const a = Math.random() * Math.PI * 2;
    const s = Math.random() * 3 + 3;
    return {
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      opacity: Math.random() * 0.5 + 0.5,
    } as Mote;
  },
  update: (m, w, h) => {
    m.x += m.vx;
    m.y += m.vy;
    m.vx *= 0.96;
    m.vy *= 0.96;
    m.opacity -= 0.015;
    if (m.opacity <= 0) {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 3 + 3;
      m.x = Math.random() * w;
      m.y = Math.random() * h;
      m.vx = Math.cos(a) * s;
      m.vy = Math.sin(a) * s;
      m.opacity = Math.random() * 0.5 + 0.5;
    }
  },
  draw: (ctx, m, c) => {
    const tx = m.x - m.vx * 4;
    const ty = m.y - m.vy * 4;
    const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
    g.addColorStop(0, `${c}0)`);
    g.addColorStop(1, `${c}${m.opacity})`);
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(m.x, m.y);
    ctx.strokeStyle = g;
    ctx.lineWidth = m.r;
    ctx.lineCap = 'round';
    ctx.stroke();
  },
};

const cosmicDust: MoteConfig = {
  count: (w, h) => Math.min(60, Math.floor((w * h) / 16000)),
  spawn: (w, h) =>
    ({
      ...defaultMote(),
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      vx: 0,
      vy: 0,
      opacity: 0,
      drift: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.003 + 0.001,
      baseOpacity: Math.random() * 0.3 + 0.2,
      glow: Math.random() * Math.PI * 2,
      glowSpeed: Math.random() * 0.02 + 0.01,
    }) as Mote,
  update: (m, w, h) => {
    m.x += Math.cos(m.drift) * 0.3 + (Math.random() - 0.5) * 0.1;
    m.y += Math.sin(m.drift) * 0.25 + (Math.random() - 0.5) * 0.1;
    m.drift += m.speed;
    m.glow += m.glowSpeed;
    if (m.x < -10) m.x = w + 10;
    if (m.x > w + 10) m.x = -10;
    if (m.y < -10) m.y = h + 10;
    if (m.y > h + 10) m.y = -10;
  },
  draw: (ctx, m, c) => {
    const p = Math.sin(m.glow) * 0.2;
    const o = m.baseOpacity + p;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r * 3, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${Math.max(0.02, o * 0.12)})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fillStyle = `${c}${Math.max(0.1, o * 0.5)})`;
    ctx.fill();
  },
};

const moteEffects: Record<string, MoteConfig> = {
  snowfall,
  bubbles,
  embers,
  starfield,
  lightDust,
  fireflies,
  bloodRain,
  purpleParticles,
  neonSparks,
  cosmicDust,
};

/* ── Particles (hacker/matrix) — mouse interaction + connection lines ── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}
let particles: Particle[] = [];

function initParticles(): void {
  const base = Math.min(80, Math.floor((w * h) / 12000));
  const count = isTouchDevice ? Math.floor(base * 0.4) : base;
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
  }));
}

function drawParticles(color: string): void {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  const cols = Math.ceil(w / CELL_SIZE) || 1;
  const rows = Math.ceil(h / CELL_SIZE) || 1;

  for (const p of particles) {
    if (mouse.x !== null && mouse.y !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        const f = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        p.x += (dx / dist) * f * 2;
        p.y += (dy / dist) * f * 2;
      }
    }
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `${color}${p.opacity})`;
    ctx.fill();
  }

  // Connection lines via spatial grid
  const grid: number[][] = new Array(cols * rows);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const ci =
      Math.min(Math.floor(p.y / CELL_SIZE), rows - 1) * cols +
      Math.min(Math.floor(p.x / CELL_SIZE), cols - 1);
    if (!grid[ci]) grid[ci] = [];
    grid[ci].push(i);
  }
  ctx.lineWidth = 0.5;
  const seen = new Set<string>();
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const cx = Math.min(Math.floor(p.x / CELL_SIZE), cols - 1);
    const cy = Math.min(Math.floor(p.y / CELL_SIZE), rows - 1);
    for (let ny = Math.max(0, cy - 1); ny <= Math.min(rows - 1, cy + 1); ny++) {
      for (let nx = Math.max(0, cx - 1); nx <= Math.min(cols - 1, cx + 1); nx++) {
        const cell = grid[ny * cols + nx];
        if (!cell) continue;
        for (const j of cell) {
          if (j <= i) continue;
          const k = `${i}:${j}`;
          if (seen.has(k)) continue;
          const p2 = particles[j];
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < CONNECT_DIST) {
            seen.add(k);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${color}${0.15 * (1 - d / CONNECT_DIST)})`;
            ctx.stroke();
          }
        }
      }
    }
  }
}

/* ── Retro Grid (synthwave) ── */
let gridOffset = 0;
function drawRetroGrid(color: string): void {
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  const horizon = h * 0.45;
  const lines = 20;
  const cols = 30;
  gridOffset = (gridOffset + 0.5) % (h / lines);

  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, 'rgba(26, 16, 40, 0)');
  sky.addColorStop(1, 'rgba(255, 46, 151, 0.05)');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, horizon);

  ctx.lineWidth = 1;
  for (let i = 0; i <= lines; i++) {
    const y = horizon + (i + gridOffset / (h / lines)) * ((h - horizon) / lines);
    ctx.strokeStyle = `${color}${(i / lines) * 0.3})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  const cx = w / 2;
  for (let j = -cols / 2; j <= cols / 2; j++) {
    const s = j / (cols / 2);
    ctx.strokeStyle = `${color}0.15)`;
    ctx.beginPath();
    ctx.moveTo(cx + s * w * 0.8, h);
    ctx.lineTo(cx + s * 20, horizon);
    ctx.stroke();
  }
  const sun = ctx.createRadialGradient(cx, horizon - 30, 10, cx, horizon - 30, 80);
  sun.addColorStop(0, 'rgba(249, 200, 14, 0.3)');
  sun.addColorStop(0.5, 'rgba(255, 46, 151, 0.15)');
  sun.addColorStop(1, 'rgba(255, 46, 151, 0)');
  ctx.fillStyle = sun;
  ctx.beginPath();
  ctx.arc(cx, horizon - 30, 80, 0, Math.PI * 2);
  ctx.fill();
}

/* ── Effect Registry ── */
const effects: Record<string, { init: () => void; draw: (c: string) => void }> = {
  particles: { init: initParticles, draw: drawParticles },
  retroGrid: { init: () => {}, draw: drawRetroGrid },
};
for (const [name, cfg] of Object.entries(moteEffects)) {
  effects[name] = { init: () => initMotes(cfg), draw: (c) => drawMotes(cfg, c) };
}

let currentEffect = '';
let mouseAttached = false;

function onMouseMove(e: MouseEvent): void {
  const r = canvas?.getBoundingClientRect();
  if (!r) return;
  mouse.x = e.clientX - r.left;
  mouse.y = e.clientY - r.top;
}
function onMouseLeave(): void {
  mouse.x = null;
  mouse.y = null;
}

function switchEffect(effect: string): void {
  if (effect === currentEffect) return;
  currentEffect = effect;
  if (effects[effect]) effects[effect].init();
  const needsMouse = effect === 'particles';
  if (needsMouse && !mouseAttached) {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    mouseAttached = true;
  } else if (!needsMouse && mouseAttached) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
    mouse.x = null;
    mouse.y = null;
    mouseAttached = false;
  }
}

/* ── Main Loop ── */
export function initParticleCanvas(canvasId: string): void {
  if (initialized) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  if (!ctx) return;
  initialized = true;

  let color = getParticleColor();

  function onResize(): void {
    resize();
    if (effects[currentEffect]) effects[currentEffect].init();
  }

  resize();
  switchEffect(THEME_EFFECT[getTheme()] || 'particles');

  function draw(): void {
    if (document.hidden) {
      frameId = null;
      return;
    }
    const theme = getTheme();
    const target = THEME_EFFECT[theme] || 'particles';
    if (target !== currentEffect) switchEffect(target);
    if (effects[currentEffect]) effects[currentEffect].draw(color);
    frameId = requestAnimationFrame(draw);
  }

  frameId = requestAnimationFrame(draw);

  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    } else if (frameId === null) {
      frameId = requestAnimationFrame(draw);
    }
  });

  // React to theme changes
  new MutationObserver(() => {
    color = getParticleColor();
    const target = THEME_EFFECT[getTheme()] || 'particles';
    if (target !== currentEffect) switchEffect(target);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

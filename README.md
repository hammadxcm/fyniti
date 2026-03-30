# FYNITI — IT Solutions & Digital Innovation

[![CI/CD](https://github.com/hammadxcm/fyniti/actions/workflows/deploy.yml/badge.svg)](https://github.com/hammadxcm/fyniti/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue?logo=github)](https://fyniti.co.uk)
[![Astro](https://img.shields.io/badge/Astro-6.x-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![License](https://img.shields.io/badge/license-Private-red)](#)

### Lighthouse Scores

[![Performance](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/hammadxcm/661eeba9ffeb25c9d5e952d83f6d6879/raw/lh-perf.json)](https://github.com/hammadxcm/fyniti/actions)
[![Accessibility](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/hammadxcm/661eeba9ffeb25c9d5e952d83f6d6879/raw/lh-a11y.json)](https://github.com/hammadxcm/fyniti/actions)
[![Best Practices](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/hammadxcm/661eeba9ffeb25c9d5e952d83f6d6879/raw/lh-bp.json)](https://github.com/hammadxcm/fyniti/actions)
[![SEO](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/hammadxcm/661eeba9ffeb25c9d5e952d83f6d6879/raw/lh-seo.json)](https://github.com/hammadxcm/fyniti/actions)

> **Live:** [fyniti.co.uk](https://fyniti.co.uk)

Corporate website for FYNITI — a UK-based IT solutions company delivering software development, cloud infrastructure, and digital experiences.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 6](https://astro.build) (static output) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) + scoped CSS |
| Components | Astro components + [React 19](https://react.dev) islands |
| Animation | [GSAP](https://gsap.com), [Framer Motion](https://motion.dev), [Flubber](https://github.com/veltman/flubber) (SVG morph) |
| Canvas | Custom particle system (12 theme-specific effects) |
| Icons | [Lucide](https://lucide.dev), animated SVGs ([techstack-generator](https://github.com/qkrdmstlr3/techstack-generator) + [Devicon](https://devicon.dev)) |
| Linting | [Biome](https://biomejs.dev) |
| Forms | [Web3Forms](https://web3forms.com) API |
| CI/CD | GitHub Actions → GitHub Pages |
| Domain | Custom domain via GoDaddy DNS |

## Features

### Visual & Animation
- **15 themes** — dark/light system with per-theme canvas effects (matrix rain, blood rain, particles, starfield, retro grid, snowfall, fireflies, and more)
- **Logo morph** — FYNITI letterforms morph into infinity sign using Flubber path interpolation
- **Logo scramble** — SVG rect paths randomize and resolve on hover (per-instance, independent)
- **Magnetic hover** — nav elements subtly follow cursor within proximity radius
- **Animated tech icons** — 44 SVGs with CSS `@keyframes` / SMIL animations in the marquee
- **Team card glitch** — avatar jitter + hue-rotate on hover, social icons appear with delay

### Sections
- **Hero** — canvas effects, logo morph/scramble, typewriter, 3D tilt, breathing glow
- **About** — animated stat counters (Intersection Observer), gradient accent bars, values badges
- **Services** — bento grid with cursor-tracking glimmer, spotlight dimming, 9 icon animations
- **Process** — 5-step timeline with horizontal connector, staggered entrance
- **Technologies** — 41-icon animated marquee (techstack-generator + Devicon)
- **Team** — flip-free cards with glitch hover + social icon reveal
- **Testimonials** — auto-scrolling marquee with real LinkedIn recommendations
- **Contact** — Web3Forms integration, validation, success/error states, mailto fallback
- **Footer** — dynamic copyright year, social links, responsive grid

### Production Ready
- **SEO** — meta tags, OG image, canonical URLs, sitemap, robots.txt
- **Accessibility** — skip-to-content, `:focus-visible`, `prefers-reduced-motion` support
- **Performance** — lazy-loaded scripts, `requestIdleCallback`, visibility-paused canvas
- **404 page** — styled error page
- **i18n** — 10 language support with RTL

## Project Structure

```
src/
├── components/          # Astro + React components
│   ├── react/           # React islands (hooks, interactive)
│   ├── Nav.astro        # Header with logo morph/scramble
│   ├── Hero.astro       # Hero with canvas effects
│   ├── About.astro      # Stats + values
│   ├── Services.astro   # Bento grid services
│   ├── Process.astro    # Timeline steps
│   ├── Technologies.astro # Animated icon marquee
│   ├── Team.astro       # Team cards
│   ├── TeamCard.astro   # Reusable team card
│   ├── Testimonials.astro # Review marquee
│   ├── Contact.astro    # Form + info
│   └── Footer.astro     # Links + socials
├── data/
│   └── site.ts          # All site data (config, services, team, testimonials, stats)
├── layouts/
│   └── Layout.astro     # HTML shell, meta, fonts
├── pages/
│   ├── index.astro      # Homepage
│   └── 404.astro        # Error page
├── scripts/             # Client-side TypeScript
│   ├── canvas.ts        # 12-effect particle system
│   ├── matrix-rain.ts   # Matrix rain overlay
│   ├── logo-morph.ts    # Flubber FYNITI ↔ infinity
│   ├── logo-scramble.ts # SVG rect scramble on hover
│   ├── magnetic-hover.ts # Cursor-following effect
│   ├── counter.ts       # Scroll-triggered number counters
│   ├── theme-switcher.ts # 15-theme persistence
│   ├── i18n.ts          # Language switching
│   └── ...
├── styles/
│   ├── global.css       # Base, utilities, a11y
│   ├── themes.css       # 15 theme definitions + Arctic overrides
│   └── chatbot.css      # Chatbot widget styles
└── public/
    ├── icons/animated/  # 44 animated SVG tech icons
    ├── icons/skills/    # Static SVG tech icons
    ├── fonts/           # Inter + Fira Code (woff2)
    └── team/            # Team photos
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint
pnpm lint

# Auto-fix lint issues
pnpm lint:fix
```

### Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `PUBLIC_WEB3FORMS_KEY` | `.env` / GitHub Secrets / Vercel | Contact form API key |

## Deployment

### GitHub Pages (primary)
- Push to `main` → GitHub Actions runs lint → build → deploy
- Custom domain: `fyniti.co.uk` (configured via GoDaddy DNS)
- SSL: auto-provisioned by GitHub via Let's Encrypt

### Vercel (linked)
- Project linked at `hammadkhanxcm-gmailcoms-projects/fyniti`
- Env vars configured for production + development

## CI/CD Pipeline

```
push to main
  ↓
Lint (Biome) → pass?
  ↓
Build (Astro) → pass?
  ↓
Deploy (GitHub Pages)
```

- **Actions:** v5 (Node 24 native — zero deprecation warnings)
- **Triggers:** push to main, pull requests, manual dispatch
- **Concurrency:** cancels in-progress deploys on new push

## Theme System

15 themes with per-theme canvas effects:

| Theme | Canvas Effect | Brand Color |
|-------|--------------|-------------|
| Hacker (default) | Particles + Matrix Rain | `#00A8A8` |
| Matrix | Particles + Matrix Rain | `#00FF41` |
| Blood Moon | Blood Rain | `#FF0040` |
| Dracula | Purple Particles | `#BD93F9` |
| Synthwave | Retro Grid | `#FF2E97` |
| Nord | Snowfall | `#88C0D0` |
| Midnight | Starfield | `#7B73FF` |
| Cyberpunk | Neon Sparks | `#FFD700` |
| Arctic (light) | Light Dust | `#0369A1` |
| + 6 more... | | |

---

Built by [Hammad Habib Khan](https://hk.fyniti.co.uk) & [Zeeshan Asim](https://www.instagram.com/zee.axb/)

# Contributing to FYNITI

Thanks for considering contributing! Here's how to get started.

## Development Workflow

1. **Fork** the repo and clone locally
2. **Branch** from `main`: `git checkout -b feature/your-feature`
3. **Install**: `pnpm install`
4. **Develop**: `pnpm dev`
5. **Lint**: `pnpm lint` (must pass with zero errors)
6. **Build**: `pnpm build` (must complete successfully)
7. **Commit** with a clear message (see below)
8. **Push** and open a Pull Request against `main`

## Commit Messages

Use conventional format:

```
type: short description

feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting (no logic change)
refactor: Code restructure
ci:       CI/CD changes
deps:     Dependency updates
```

## Pull Request Process

1. PRs require **1 approving review** before merge
2. **Lint** and **Build** CI checks must pass
3. PRs are **squash-merged** for clean history
4. Stale reviews are automatically dismissed on new commits
5. Branch is auto-deleted after merge

## Code Standards

- **TypeScript** — strict mode, no `any`
- **Biome** — linting + formatting (run `pnpm lint:fix`)
- **Astro files** — excluded from Biome (template syntax unsupported)
- **CSS** — use `var(--color-brand)` tokens, never hardcode colors
- **Accessibility** — semantic HTML, ARIA labels, `prefers-reduced-motion`
- **Mobile-first** — all components must work on 320px+ screens

## Reporting Issues

Use [GitHub Issues](https://github.com/hammadxcm/fyniti/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/device info (if UI bug)
- Screenshot if applicable

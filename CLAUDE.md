# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start local dev server (Astro)
npm run build     # Production build → ./dist/
npm run preview   # Preview production build locally
```

Requires Node >= 22.12.0.

## Architecture

Astro 6 static landing site for **Cantieri** (construction management SaaS). Tailwind CSS v4 for styling. No JS frameworks — pure Astro components with minimal inline scripts.

### i18n System (`src/i18n.ts`)

All text is translated via `t(lang, key)` with keys namespaced as `section.key` (e.g., `'pricing.title'`). Three languages: Italian (default, `/`), English (`/en/`), Arabic (`/ar/` with RTL). Translations live inline in `src/i18n.ts`, not in the JSON files under `public/locales/` (those are unused legacy files from the app).

Every component accepts a `lang: Lang` prop and uses `t(lang, key)` for all user-facing text. When adding a new translation key, add it to all three language objects in `i18n.ts`.

### Page Structure

Each locale has its own page file (`src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/ar/index.astro`). All three render the same component sequence — when adding/removing a section, update all three pages.

### Styling

- Tailwind CSS v4 with `@theme` custom properties in `src/styles/global.css`
- Primary brand color: `#F28F16` (orange), available as `primary-50` through `primary-950`
- Design system reference: gradient CTAs use `linear-gradient(135deg, #994100, #ff7a23)`
- No CSS modules or CSS-in-JS — all styling via Tailwind utility classes

### Typography

Single font family for the entire site: **Inter** (Google Fonts), loaded in `Layout.astro`.

| Use case | Class | Example |
|---|---|---|
| Page headings (h1) | `text-5xl font-semibold tracking-tight` (sm: `text-7xl`) | Hero title |
| Section headings (h2) | `text-3xl font-bold tracking-tight` (sm: `text-4xl`) | Features, Pricing, CTA titles |
| Card headings (h3) | `text-lg font-semibold` | Solution cards, footer sections |
| Body text | `text-lg font-medium` (sm: `text-xl/8`) | Paragraphs, descriptions |
| Small / UI text | `text-sm font-semibold` | Buttons, nav links, labels |
| Stats numbers | `text-4xl font-bold tracking-tight` (sm: `text-5xl`) | Stat counters |

Weights loaded: 400 (regular), 500 (medium), 600 (semibold), 700 (bold). Do not use other weights.

### Design System Principles

- **No borders for separation** — use background color shifts between surfaces instead
- **Surface hierarchy**: base `#f4f6ff`, container-low `#eaf1ff`, container `#dce9ff`
- **Text color**: never pure black — use slate tones (`#203044` / on-surface)
- **Shadows**: atmospheric and tinted, not structural (4-8% opacity)
- **Primary CTA buttons**: gradient background (primary→tertiary, 135deg)
- **Ghost buttons**: no background, primary text color, hover with subtle bg
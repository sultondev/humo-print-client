# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server at http://localhost:3000
pnpm build         # Build for production
pnpm generate      # Static site generation
pnpm preview       # Preview production build
```

## Architecture

This is a **Nuxt 4** application (Nuxt 4.4+) using the `app/` directory convention — all source files live under `app/`.

### Stack
- **Nuxt 4** with Vue 3 Composition API (`<script setup lang="ts">`)
- **Tailwind CSS v4** — configured via `@theme {}` in `app/assets/css/main.css`, no `tailwind.config.js`
- **`@nuxt/ui` v4** — provides `UApp`, `NuxtLink`, and UI primitives; included in `nuxt.config.ts` modules
- **TypeScript** throughout

### Custom Tailwind theme tokens (defined in `main.css`)
| Token | Value | Utilities generated |
|-------|-------|---------------------|
| `--color-accent` | `#E85D26` | `text-accent`, `bg-accent`, `border-accent` |
| `--color-dark` | `#0F0F0F` | `text-dark`, `bg-dark` |
| `--color-cream` | `#F5F0EB` | `text-cream`, `bg-cream` |
| `--color-muted` | `#6B6B6B` | `text-muted`, `bg-muted` |
| `--font-outfit` | Outfit | `font-outfit` |
| `--font-sans` | DM Sans | `font-sans` (overrides default) |
| `--font-mono` | Space Mono | `font-mono` (overrides default) |

### Fonts
Google Fonts (DM Sans, Outfit, Space Mono) are loaded via `nuxt.config.ts` → `app.head.link`.

### Pages (routes)
| File | Route | Description |
|------|-------|-------------|
| `app/pages/index.vue` | `/` | Home — assembles all home section components |
| `app/pages/services.vue` | `/services` | Full-page service rows |
| `app/pages/portfolio.vue` | `/portfolio` | Filterable grid + lightbox |
| `app/pages/order.vue` | `/order` | Order form with sidebar |
| `app/pages/contact.vue` | `/contact` | Contact info + message form |

### Component auto-import naming
Nuxt auto-imports components with the directory name as prefix:
- `app/components/home/HeroSection.vue` → `<HomeHeroSection />`
- `app/components/services/ServiceRow.vue` → `<ServicesServiceRow />`
- `app/components/AppHeader.vue` → `<AppHeader />`

### Key shared components
- **`FadeUp`** — scroll-reveal wrapper using `useReveal` composable (IntersectionObserver)
- **`SectionLabel`** — orange line + uppercase label used before section headings
- **`PageHero`** — dark hero banner reused by Services, Portfolio, Order, Contact pages
- **`AppHeader`** — fixed header with scroll-based blur, desktop nav, mobile slide-over menu
- **`AppFooter`** — 4-column footer (brand, pages, services, contact)
- **`AppLogo`** — printer SVG icon + "humo**print**" logotype

### Data files
- `app/data/services.ts` — `SERVICES` array with icon, title, desc, img, products
- `app/data/portfolio.ts` — `PORTFOLIO_ITEMS` array + `PORTFOLIO_FILTERS`

### Composables
- `app/composables/useReveal.ts` — returns `{ el, visible }` for IntersectionObserver-based fade-in

### Layout
`app/layouts/default.vue` wraps every page with `<AppHeader>` + `<AppFooter>`. `app/app.vue` wraps everything in `<UApp>` for Nuxt UI context.

### Page transitions
Defined in `nuxt.config.ts` (`app.pageTransition`) with CSS class `.page-enter-from` / `.page-leave-to` in `main.css`.

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

---

## Figma / Design System Integration

### Design Tokens

All tokens are defined in `app/assets/css/main.css` inside a `@theme {}` block (Tailwind CSS v4 format). There is **no** `tailwind.config.js`.

```css
/* app/assets/css/main.css */
@theme {
  --color-accent: #E85D26;   /* Primary orange — CTAs, highlights, borders */
  --color-dark:   #0F0F0F;   /* Near-black — backgrounds, headings */
  --color-cream:  #F5F0EB;   /* Warm off-white — alternate section backgrounds */
  --color-muted:  #6B6B6B;   /* Body copy, secondary text */
  --font-sans:    'DM Sans', sans-serif;    /* Body text — overrides Tailwind default */
  --font-mono:    'Space Mono', monospace;  /* Labels, tags, badge text */
  --font-outfit:  'Outfit', sans-serif;     /* Headings, numbers, logotype */
}
```

When mapping Figma tokens → code:
- Figma "Primary / Orange" → `text-accent` / `bg-accent` / `border-accent`
- Figma "Background / Dark" → `bg-dark` / `text-dark`
- Figma "Background / Cream" → `bg-cream`
- Figma "Text / Muted" → `text-muted`
- Figma heading typeface → `font-outfit`
- Figma body typeface → `font-sans` (DM Sans)
- Figma mono / label typeface → `font-mono` (Space Mono)

### Typography Scale

Headings use fluid `clamp()` via inline `style`, not Tailwind text-size utilities:

```html
<!-- Section heading (h2) -->
<h2 class="font-outfit font-extrabold text-dark"
    style="font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em;">

<!-- Page hero heading (h1) -->
<h1 class="font-outfit font-extrabold text-white"
    style="font-size: clamp(48px, 6vw, 80px); letter-spacing: -0.03em;">

<!-- Card heading (h3) -->
<h3 class="font-outfit font-bold text-xl text-dark">

<!-- Section label (eyebrow) -->
<span class="font-mono text-[11px] tracking-[0.15em] text-accent uppercase">

<!-- Body copy -->
<p class="font-sans text-[15px] text-muted leading-relaxed">
<p class="font-sans text-[17px] text-muted leading-[1.75]">  <!-- service rows -->
```

### Spacing & Layout

- Max content width: `max-w-300` (`max-w-[1200px]`) — used on every section's inner container
- Horizontal page padding: `px-10` (40px) on section wrappers
- Section vertical padding: `py-[120px]` for standard sections, `py-20` for form pages
- Grid gap standard: `gap-6` (cards), `gap-20` (two-column image+text rows)

### Color Usage by Section

| Section background | Class |
|--------------------|-------|
| Hero, portfolio preview, footer, CTA | `bg-dark` |
| Services overview, how-it-works, FAQ, order, contact | `bg-cream` |
| Testimonials | `bg-white` |
| Service rows (alternating) | `bg-white` (even) / `bg-cream` (odd) |

### Component Patterns

#### SectionLabel (eyebrow label above headings)
```vue
<SectionLabel :text="t('section.label')" />
<!-- Renders: orange 2px line + uppercase Space Mono text in accent color -->
```

#### FadeUp (scroll-reveal wrapper)
```vue
<FadeUp :delay="i * 80">  <!-- delay in ms, staggered per item -->
  <!-- any content -->
</FadeUp>
```
Uses `useReveal()` composable (IntersectionObserver, fires once, then disconnects).

#### PageHero (inner page dark banner)
```vue
<PageHero
  :label="t('section.label')"
  :title="t('section.page_title')"
  :subtitle="t('section.page_subtitle')"
/>
```

#### ServiceCard (hover-lift card)
```vue
<ServiceCard :icon="'🖨'" :title="..." :desc="..." />
<!-- White rounded-2xl card, lifts on hover via JS hovered ref -->
```

#### PortfolioThumb / PortfolioCardFull (image cards)
```vue
<PortfolioThumb :img="url" :title="..." :cat="..." />
<!-- Zoom + dark overlay on hover, cat in Space Mono accent, title in Outfit white -->
```

### Styling Rules for Figma-to-Code

1. **Use semantic token classes** (`text-accent`, `bg-dark`, `text-muted`) — never raw hex values in class strings.
2. **Use inline `style` for fluid font sizes** — `font-size: clamp(...)` and `letter-spacing` go in `style=""`, not Tailwind utilities.
3. **Arbitrary values** are acceptable for one-off shadows, opacities, and paddings: `shadow-[0_20px_48px_rgba(0,0,0,0.12)]`, `px-[18px]`, `text-white/55`.
4. **Rounded corners**: cards use `rounded-2xl`, images use `rounded-xl`, buttons use `rounded-full`.
5. **Transitions**: use `transition-all duration-[250ms] ease-out` for hover states; page transitions are handled globally.
6. **No CSS Modules or scoped styles** — all styling is Tailwind utility classes + occasional inline `style`.

### i18n — All User-Facing Text

All strings come from `i18n/locales/{uz,ru,en}.json`. Never hardcode display text in components.

```ts
const { t, tm, rt } = useI18n()

// Single string
t('section.heading')

// Array of objects (must use rt() on each property)
const items = computed(() =>
  (tm('section.items') as Item[]).map(item => ({
    title: rt(item.title),
    desc: rt(item.desc),
  }))
)

// Array of strings
const filters = computed(() => (tm('section.filters') as string[]).map(f => rt(f)))
```

`rt()` is **required** on every value returned by `tm()` — omitting it renders compiled message functions instead of strings.

### Icons

Icons are emoji strings stored in static data files or component constants — no icon library. SVG icons are inlined directly in components (`AppLogo.vue`, `AppFooter.vue` social icons). No icon naming convention beyond descriptive emoji.

### Assets

All images are Unsplash URLs (no local image assets). No CDN configuration. Images use `object-cover` with explicit `aspect-ratio` set via inline style.

### No Storybook / Component Docs

Components are self-documented via TypeScript props interfaces and this file. There is no Storybook or separate component documentation site.

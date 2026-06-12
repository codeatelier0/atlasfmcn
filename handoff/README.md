# Handoff: Atlas FMCN — Case Study & Docs Subsite for asalamanca.work

## Overview

A new section for **asalamanca.work** (repo: `codeatelier0/asite`) that showcases Miguel Ángel Salamanca's Product Owner work on the **"Atlas FMCN"** project (interactive funding-impact map for the Fondo Mexicano para la Conservación de la Naturaleza). It consists of:

1. A **case study cover page** — executive summary, role, deliverables, embedded live demo of the map prototype, featured doc entries, and a full document index.
2. A **navigable docs subsite** — 15 documentation pages (functional spec, user stories, data model, acceptance criteria, stack, roadmap, glossary, content/data docs, and 3 AI design prompts) with grouped sidebar TOC, breadcrumbs, prev/next pagination, and copy-to-clipboard on code/prompt blocks.
3. The **map prototype** itself (`mapa_impacto_fmcn.html`), embedded in the cover via `<iframe>` and linkable as a standalone demo.

Both ES/EN via the portfolio's existing language toggle (shared `localStorage` key `mas-lang`).

## About the Design Files

These files are **design references created in HTML** — working prototypes showing intended look and behavior, not necessarily production code to ship as-is.

**However, note:** the case study deliberately uses the *exact same stack and conventions* as the existing `asite` repo (React 18 UMD + Babel standalone, `.jsx` files loaded via `<script type="text/babel">`, content in a global data object, components exported via `Object.assign(window, …)`). This makes the files **near drop-in** for that repo:

- Copy the `atlas-fmcn/` folder into the repo root.
- Keep `mapa_impacto_fmcn.html` at the repo root (the cover iframe references it as `../mapa_impacto_fmcn.html`).
- Add a project card in `data.jsx` → `work.projects` pointing to `atlas-fmcn/Atlas FMCN — Case Study.html` (consider renaming the file to something URL-safe, e.g. `atlas-fmcn/index.html`, and updating the iframe/breadcrumb relative paths accordingly).

If the site ever migrates to a static-site generator (Astro/Next/Hugo), recreate these designs there instead, generating one static route per document (see "Known gaps" below).

## Fidelity

**High-fidelity (hifi).** All tokens, components and layout patterns are lifted directly from the live `asite` codebase (`index.html`, `components.jsx`) — colors, typography, chips, cards, kickers, grid background, language toggle are pixel-identical to the portfolio. Recreate/integrate without restyling.

Per the owner's decision: **no FMCN brand accents** inside the case study — 100% portfolio identity. (FMCN colors appear only *inside* the embedded map prototype, which has its own institutional design system — see `mapa_impacto_fmcn.html` and its separate handoff README if available.)

## ⚠ Content status — placeholders

The 15 document bodies in `atlas-content.jsx` are **placeholders**. The real markdown sources live in the owner's local folder (`/home/miso/Documents/Data Engineer/FMCN/`): `1_resumen.md` … `8_glosario.md`, `Contenido.md`, `Dataimpacto.md`, `Fuentedatos.md`, `visualbrand.md`, `Prompt mapa.md`, `Prompt ux.md`, `promptsistema.md`.

To finish: paste each file's full content into `ATLAS_DOCS_BODIES` in `atlas-content.jsx`, keyed by slug (mapping table is in `atlas-data.jsx` → `ATLAS.docs`, fields `slug` ↔ `file`). Regular docs take markdown (GFM tables supported via marked.js); the three `prompt: true` docs take raw preformatted text.

## Screens / Views

### 1. Case study cover (`#/`)

- **Sticky top bar**: breadcrumbs (`asalamanca.work / proyectos / atlas-fmcn`, JetBrains Mono 12px, separator `/`) left; EN/ES toggle right. Background `rgba(14,16,20,0.85)` + `backdrop-filter: blur(8px)`, bottom border `--line`.
- **Hero** (padding `110px clamp(28px,6vw,90px) 70px`, grid background with radial mask):
  - Glowing accent dot (8px, `box-shadow: 0 0 12px 2px rgba(77,141,255,.30)`) + kicker `/ case study` (mono, 12.5px, uppercase, letter-spacing .16em, `#4d8dff`).
  - Title "Atlas FMCN" — Space Grotesk 700, `clamp(52px, 8vw, 100px)`, line-height .95, letter-spacing −.04em.
  - Mono subtitle (accent color) + blurb (muted `#8b94a3`, max-width 640px, first-person narrative).
  - Chips row (6 tags: Product Ownership, Especificación funcional, Django + HTMX, PostGIS, Leaflet, Diseño asistido por IA) — mono 11px, border `rgba(255,255,255,0.14)`, radius 6px.
  - CTAs: solid accent button "Explorar la documentación →" (mono 14px, radius 9px, padding 14px 24px, hover lift + glow) and ghost link "// ver demo interactiva".
  - **Meta strip**: 4-cell grid (rol / cliente / periodo / entregable), 1px gap on `--line` background, radius 14px, cells `#14171d`, dt mono 10.5px uppercase faint, dd 13.5px.
- **Section / 01 — El encargo**: 3-card grid (`exp-cards` pattern: 1px gaps, radius 16px, cards `#0e1014`, hover `#181c23`): El problema / Mi rol / Lo que entregué. Card: mono number accent, h3 23px, body 15.5px muted.
- **Section / 02 — Demo interactiva** (`id="demo"`): browser-chrome frame (radius 14px, border `--line-strong`, bar with three 8px dots + mono label `atlas-fmcn · prototipo v1 — mapa de impacto` + right-aligned "Abrir en pestaña completa ↗" link) containing a 640px-tall `<iframe>` of `../mapa_impacto_fmcn.html` (lazy-loaded).
- **Section / 03 — Entradas destacadas**: 2×2 `work-card` grid linking to historias-de-usuario, modelo-de-datos, criterios-de-aceptacion, roadmap. Card: category kicker + ↗ arrow (hover: accent + translate), h4 24px, desc 15px muted, footer CTA 12.5px faint→accent.
- **Section / 04 — Toda la documentación**: 4 groups (Especificación funcional · Implementación · Contenido y datos · Prompts de diseño), each a `col-head` mono uppercase accent label + row list. Row grid: `170px 220px 1fr 24px` (source filename mono faint / title 16.5px semibold / description 13.5px muted / → arrow), 1px top borders, hover `#181c23`.
- **Footer**: `← asalamanca.work` link + © line, mono 12px faint, top border.

### 2. Doc page (`#/doc/<slug>`)

- **Fixed sidebar** (292px, scrollable, `rgba(14,16,20,0.85)` + blur, right border):
  - Brand block: "MS" mark (42px, radius 10px, mono accent, hover glow) + "ATLAS FMCN / DOCUMENTACIÓN" mono 11px label; "← Volver al case study" link below.
  - TOC: 4 groups with mono uppercase faint labels; doc links 14px muted, hover text, **active = accent + 16px horizontal dash at left −28px** (portfolio's `navlink.active::before` pattern).
  - Footer: EN/ES toggle + © (mono 11px faint).
- **Main column** (margin-left 292px, max-width 880px content):
  - Breadcrumbs (now 5 levels: `asalamanca.work / proyectos / atlas-fmcn / <slug>`).
  - Group kicker + doc title (Space Grotesk 700, `clamp(36px,4.6vw,58px)`).
  - Meta line (mono 12px faint): `Archivo fuente: <file>`; in EN also "Original document in Spanish."
  - **Markdown body** (marked.js, GFM): h2 with bottom border; tables with mono uppercase accent `th`, `--line` row borders, row hover; blockquotes with 2px accent left border on `#181c23` panel, radius `0 10px 10px 0`; inline code mono 0.85em on `#1d222b` w/ light-blue `#a8c7ff`; `pre` blocks on `#181c23`, radius 12px, **auto-injected "Copiar" button** top-right (mono 11px, hover accent, flips to "Copiado ✓" for 1.6s).
  - **Prompt pages** (`prompt: true`): accent-bordered intro note + single `<pre>` (white-space pre-wrap, mono 13px/1.75, radius 14px, top padding 54px) with a **"Copiar prompt completo"** button pinned top-right.
  - **Prev/next pager**: 2-col grid above 80px top margin + border; cards radius 12px with uppercase mono direction label (faint→accent on hover) + doc title 17px; next card right-aligned.

## Interactions & Behavior

- **Routing**: hash-based — `#/` cover, `#/doc/<slug>` docs. Unknown slugs fall back to cover. `hashchange` listener; scroll resets to top on doc change; `document.title` updates per page (localized).
- **Language**: single EN/ES toggle, persisted to `localStorage["mas-lang"]` (same key as the portfolio → language carries across the whole site). UI chrome and cover narrative are fully bilingual; doc bodies remain Spanish (original documents), with an explanatory note shown in EN mode.
- **Copy-to-clipboard**: `navigator.clipboard.writeText` with `execCommand` fallback; 1.6s "Copiado ✓" confirmation.
- **Hovers**: 0.2–0.3s ease transitions throughout (cards lift/tint, arrows translate, links to accent) — matching portfolio timing.
- **Demo iframe**: `loading="lazy"`; the prototype inside manages its own state (Leaflet map, filters, its own ES/EN toggle).
- **Responsive** (≤980px): sidebar becomes a static top block with the TOC as a wrapping horizontal list; meta strip 4→2 columns; card grids → 1 column; index rows stack; pager stacks; iframe 520px.

## State Management

| State | Where | Notes |
|---|---|---|
| `route` `{page, slug}` | React state ← `location.hash` | Hash router, no library |
| `lang` `"es" \| "en"` | React state + `localStorage["mas-lang"]` | Shared with portfolio shell |
| copy confirmation | local component state / DOM | 1.6s timeout |

No data fetching — all content is bundled in `atlas-data.jsx` (registry + bilingual copy) and `atlas-content.jsx` (doc bodies).

## Design Tokens (identical to asalamanca.work)

| Token | Value |
|---|---|
| `--bg` / `--bg-2` | `#0e1014` / `#14171d` |
| `--panel` / `--panel-2` | `#181c23` / `#1d222b` |
| `--line` / `--line-strong` | `rgba(255,255,255,0.07)` / `rgba(255,255,255,0.14)` |
| `--text` / `--muted` / `--faint` | `#eef1f6` / `#8b94a3` / `#565f6e` |
| `--accent` / `--accent-dim` / `--accent-glow` | `#4d8dff` / `#2a6fdb` / `rgba(77,141,255,0.30)` |
| Fonts | Space Grotesk 400–700 (display/body) · JetBrains Mono 400–700 (kickers, meta, code) |
| Radii | 6px chips · 7–9px buttons · 10px mark · 12px pre/pager · 14px frames/meta · 16px card grids |
| New tokens (this section only) | `--docside: 292px` (docs sidebar) · `--maxw: 880px` (doc content measure) |

Type scale: cover title clamp(52–100px) · doc title clamp(36–58px) · section titles clamp(34–54px) · card h3/h4 23–24px · body 16.5–17px · meta/mono 11–14px.

## SEO

Implemented: `<title>`, `meta description`, OpenGraph (`og:title`, `og:description`, `og:type`) on the HTML shell; per-route `document.title` updates client-side.

**Known gap:** the original brief asks for static routes and per-page OG tags (`/proyectos/atlas-fmcn/...`). A hash-router SPA cannot provide per-document OG/meta for crawlers. If per-page SEO matters, generate one static HTML page per document at build time (or migrate to an SSG) — the component/data structure here maps cleanly onto that (registry in `atlas-data.jsx` = route manifest).

## Accessibility

- Hierarchical headings per page; `nav` landmarks with `aria-label` (breadcrumbs, TOC, pager); `aria-label` on language toggle and copy buttons; all interactive elements are native `<a>`/`<button>`.
- Contrast on dark bg meets AA for body text (`#eef1f6`, `#8b94a3` on `#0e1014`).
- If dashboard screenshots are added later, include descriptive `alt` text.

## Assets

- **Fonts**: Google Fonts CDN (Space Grotesk, JetBrains Mono).
- **Libraries**: React 18.3.1 + Babel standalone (pinned, SRI) — same as the portfolio; marked 12.0.2 for GFM markdown.
- **Demo**: `mapa_impacto_fmcn.html` (self-contained; Leaflet 1.9.4 + Chart.js 4.4.9 + CARTO tiles via CDN).
- No images yet. Screenshots of the map prototype can be added to the cover/docs as evidence (owner opted to embed the live demo instead).

## Files

```
design_handoff_atlas_fmcn/
├── README.md                              ← this file
├── mapa_impacto_fmcn.html                 ← map prototype (iframe target; keep at parent level of atlas-fmcn/)
└── atlas-fmcn/
    ├── Atlas FMCN — Case Study.html       ← shell: all CSS + CDN scripts (rename to index.html for clean URLs)
    ├── atlas-data.jsx                     ← registry of 15 docs + bilingual cover/UI copy
    ├── atlas-content.jsx                  ← doc bodies (⚠ PLACEHOLDERS — paste real .md content here)
    ├── atlas-components.jsx               ← Cover, DocsSidebar, MarkdownBody, PromptBody, DocPage, Crumbs
    └── atlas-app.jsx                      ← hash router + language state
```

# Handoff: Mapa de Impacto Territorial FMCN 2025

## Overview

A single-page interactive impact map for the **Fondo Mexicano para la Conservación de la Naturaleza (FMCN)**. It communicates the territorial footprint of FMCN's 2025 portfolio: 17 conservation programs plotted on a map of Mexico as proportional bubbles, with an editorial side panel showing per-program profiles (KPIs, funding, comparison chart), global portfolio statistics, intervention-type filters that double as a color legend, and a full ES/EN language toggle.

Design inspiration: clean, editorial, professional — in the spirit of Mapbox Stories / National Geographic interactive reports.

## About the Design Files

The file in this bundle (`mapa_impacto_fmcn.html`) is a **design reference created in HTML** — a static, self-contained prototype showing intended look and behavior. It is **not production code to copy directly**.

The production target (per the project's `Prompt mapa.md` / `promptsistema.md`) is a **Django + HTMX + PostGIS** application. The task is to recreate this design there:

- The prototype's layout and Leaflet map become `templates/mapa/index.html` + `static/mapa/js/mapa.js`.
- Filter/panel interactions implemented here in vanilla JS should be implemented in production as **HTMX fragments served by Django**.
- Alternatively, the prototype can be embedded as-is via `<iframe>` during a transition period — it works opened directly in a browser with no backend (all data is hardcoded).
- Leaflet plays the same role in both contexts (map, markers, popups); Chart.js is the sanctioned complementary chart component (stack spec §6.3).

If no environment exists yet, choose the framework that fits the production spec above.

## Fidelity

**High-fidelity (hifi).** Colors, typography, spacing, copy and interactions are final and follow the FMCN institutional brand (`visualbrand.md`). Recreate the UI pixel-perfectly. Two palettes coexist and **must not be mixed**:

1. **Institutional UI chrome palette** (header, footer, buttons, badges, links).
2. **Semantic map-category palette** for `tipo_intervencion` (a fixed encoding from `Prompt mapa.md` / `4_datastr.md` §4.1).

## Screens / Views

There is a single screen with two panel states.

### Layout (overall)

Full-viewport flex column (`100vh`, no body scroll on desktop):

```
┌─────────────────────────────────────────────────────────┐
│  HEADER: logo | title + ES/EN | filter pills (right)     │
├───────────────────────┬─────────────────────────────────┤
│   LEAFLET MAP         │   SIDE PANEL                     │
│   flex: 0 0 65%       │   flex: 0 0 35%, own scroll      │
├───────────────────────┴─────────────────────────────────┤
│  GLOBAL STATS BAR (full width, 52px, fixed bottom)       │
└─────────────────────────────────────────────────────────┘
```

Responsive: at `max-width: 768px` the map/panel columns stack vertically (map on top, full width, `55vh` tall; panel below). Header pills wrap to a second row; footer wraps; body becomes scrollable.

### Component 1 — Header

- Background `#FFFFFF`, `border-bottom: 1px solid #E5E7EB`, padding `10px 20px`, flex row, `gap: 16px`.
- **Logo placeholder** (left): 40×40px, background `#0F6E56`, border-radius 8px, text "FMCN" in white, Lato 700 11px, letter-spacing 0.5px. *Replace with the real FMCN logo asset in production.*
- **Title block** (center-aligned text): `"Impacto territorial 2025"` — Lato 600, 18px, `#111827`; subtitle `"Fondo Mexicano para la Conservación de la Naturaleza"` — Open Sans 400, 12px, `#6B7280`.
- **Language toggle** next to title: two buttons `ES` / `EN` inside a 20px-radius bordered capsule (`1px solid #E5E7EB`). Active button: background `#185FA5`, white text; inactive: transparent, `#6B7280`. Font: Lato 700 12px. Switching re-renders every visible string (UI labels, pills, panel, footer, tooltips, region labels) and updates `document.documentElement.lang`.
- **Filter pills** (right, `margin-left: auto`, flex `gap: 8px`, wrap): one per `tipo_intervencion` value plus `Todos`. Each typed pill carries a 9px color dot — the pills double as the map's color legend.
  - Pill base: `border: 1px solid #D1D5DB`, background white, color `#6B7280`, border-radius 20px, padding `6px 14px`, Lato 600 12.5px, transition `all .2s ease`.
  - Hover: border and text turn `#0F6E56`.
  - Active (`aria-pressed="true"`): background `#0F6E56`, border `#0F6E56`, white text; the color dot gets a `1.5px` white outline.

### Component 2 — Leaflet map

- Tile layer: **CartoDB Positron** (`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`, subdomains `abcd`), OSM + CARTO attribution.
- Initial view: center `lat 23.6345, lng -102.5528`, zoom `5`.
- **Markers**: circular `divIcon` bubbles, radius proportional to hectares (discrete prototype scale — production uses a continuous scale on the same metric `ha_protegidas + ha_manejo_sostenible`):
  - `ha ≤ 10,000` → r = 8px
  - `10k < ha ≤ 100k` → r = 12px
  - `100k < ha ≤ 500k` → r = 16px
  - `ha > 500k` → r = 22px
  - Bubble style: `border-radius: 50%`, `border: 1.5px solid rgba(255,255,255,.9)`, `box-shadow: 0 0 0 1px rgba(0,0,0,.12)`, fill = category color.
- **Category colors** (`tipo_intervencion`, fixed semantic encoding — do not reinterpret):

  | Enum value | Color | Label (ES) |
  |---|---|---|
  | `anp` | `#0F6E56` | ANP federales |
  | `cuenca` | `#185FA5` | Cuencas hidrográficas |
  | `costero` | `#3C3489` | Costero-marino |
  | `paisaje` | `#BA7517` | Paisaje productivo |
  | `especie` | `#993C1D` | Especie / fondo patrimonial |

- **Hover**: bubble scales to 1.18 (`transform`, `.2s ease`) and a floating tooltip shows program name (Lato, 13px, bold) + headline figure (hectares, or beneficiaries if hectares are N/D). Tooltip: white, `1px solid #E5E7EB`, radius 8px, no shadow, padding `7px 11px`.
- **Click**: side panel switches to that program's profile; the selected bubble gets a **pulsing outer ring** — `::after` pseudo-element, `inset: -7px`, 2px border in the category color, keyframe animation scaling 0.8 → 1.25 while fading out, 1.6s ease-out infinite. (This indicates *selection*; it is distinct from the production "Semáforo de KPI" trend recoloring, which is not part of this prototype.)
- **Keyboard**: markers are focusable (Leaflet `keyboard: true`, `alt` set to program name); Enter activates.
- **Optional layer toggle** (custom Leaflet control, top-right): "Regiones" button (white, 8px radius; active state background `#185FA5`, white text) toggles 6 semi-transparent polygons of Mexico's biogeographic regions — fill `rgba(0,0,0,0.06)`, 1px stroke `rgba(0,0,0,0.18)`, non-interactive, each with an uppercase gray 11px label. **This layer is exploratory prototype-only** and does not map 1:1 to any production Zone-3 layer; the polygon coordinates are rough approximations.

### Component 3 — Side panel (right, 35%, own scroll, padding 24px)

**Default state (no selection / after filtering):** welcome card —
- Title: "Conservar el patrimonio natural de México" — Lato 700, 24px.
- Intro paragraph (Open Sans 14px / 1.6, `#6B7280`): FMCN, 26 active projects, 53.5M ha financed, 369 local organizations, 425 priority species.
- 4 global KPIs in a 2×2 grid (cards: background `#F9FAFB`, `1px solid #E5E7EB`, radius 8px, padding `14px 16px`; value Lato 700 22px; label Open Sans 12px `#6B7280`):
  - **53.5M** ha protegidas · **26** proyectos activos · **369** organizaciones locales · **425** especies prioritarias
- Hint line (13px, secondary) prompting map selection.
- Link `"Conoce más ↗"` → `https://fmcn.org` (color `#185FA5`, Open Sans 600, underline on hover).

**Active state (program selected):** vertical card stack, `gap: 18px` —
1. "← Volver al resumen" text button (`#185FA5`, 13px) returning to welcome state and clearing selection.
2. **Program header** (bottom border `#E5E7EB`): 14px color dot + program name (Lato 700, 22px); category label in the category color (uppercase, 11.5px, letter-spacing .06em); states/region line (13px, `#6B7280`).
3. **Editorial description**: 2–3 lines, Open Sans 13px / 1.6.
4. **KPIs 2×2 grid** (same card style as welcome): Hectáreas | Personas | Organizaciones | Especies. Missing values render literally as `N/D`; numbers use thousands separators.
5. **Financiamiento badge**: background `#a7a337` (institutional olive-yellow), text `#111827`, border-radius 20px (same radius as header pills), padding `5px 14px`, Open Sans 600 12.5px.
6. **Mini bar chart** (Chart.js, 120px tall): horizontal bars comparing this program's hectares vs the portfolio average (mean of programs with `ha > 0`). **Logarithmic x-axis** — portfolio values span 1,260 to 98,000,000 ha, unreadable on a linear scale. Program bar uses the category color; average bar `#D1D5DB`; bar thickness 22px, radius 4; ticks abbreviated (`1k`, `1M`). If the program has no hectare data, show an italic note instead of the chart.
7. **CTA button** `"Ver ficha completa ↗"`: full-width, background `#0F6E56` (hover `#0c5a47`), white, Lato 700 14px, radius 8px, padding `12px 16px`. Currently fires `console.log('abrir ficha: ' + id)` — **placeholder for future routing** to the full program detail page.

All section labels ("KPIs", "Financiamiento", chart caption) use: Lato 700, 11.5px, uppercase, letter-spacing .08em, `#6B7280`.

### Component 4 — Global statistics bar (footer)

- Background `#0F6E56`, white text, height 52px, flex row centered.
- 5 metrics separated by vertical dividers (`1px solid rgba(255,255,255,.25)`), each: number (Lato 700, 17px) + label (Open Sans 12px, 85% opacity):
  - `53.5M ha financiadas` · `26 proyectos` · `3,189 donativos` · `125,661 personas` · `232 ANP federales`
- These reflect the **full 26-project 2025 portfolio**, not just the 17 mapped programs.

## Interactions & Behavior

- **Filter pills**: activating a `tipo_intervencion` pill dims all non-matching markers to `opacity 0.15` (production `mapa.js` uses 0.1 for its Zone-2 filters — same attenuation principle); matching markers stay at opacity 1.0 and scale up slightly (1.18). The side panel resets to the welcome state and any selection is cleared. `Todos` restores everything.
- **Marker click / Enter** → select program, render profile panel, pulse ring on the marker, panel scrolls to top.
- **Language toggle** → re-renders all strings, pills, footer, tooltips, region labels and the open panel; chart labels re-localize.
- **Transitions**: `0.2s ease` on all hover/selection states (pills, markers, buttons, language toggle). The pulse ring is the only looping animation.
- **No fetch/XHR/database**: all data lives in JS constants in the file. The only network dependencies are CDNs (Leaflet 1.9.4, Chart.js 4.x, Google Fonts) and CARTO tiles.

## State Management

Three pieces of state, all client-side:

| State | Values | Triggers |
|---|---|---|
| `filtroActivo` | `"todos"` \| `anp` \| `cuenca` \| `costero` \| `paisaje` \| `especie` | Header pill click. Side effects: marker dim/highlight, panel → welcome, selection cleared. |
| `programaSeleccionado` | `null` \| program id | Marker click/Enter (set); "Volver" button or any filter change (clear). Side effects: panel render, pulse ring, chart create/destroy. |
| `lang` | `"es"` \| `"en"` | Language toggle. Side effect: full string re-render. |

The Chart.js instance must be destroyed before re-creating (panel re-renders on every selection/language change).

In production these map to HTMX-driven fragment swaps: the filter and selection states become query params / fragment endpoints; `lang` follows the site's i18n mechanism.

## Design Tokens

### Colors — institutional UI chrome (`visualbrand.md`)
| Token | Value | Use |
|---|---|---|
| Verde/turquesa (primary accent) | `#0F6E56` | Logo block, active pills, CTA button, footer background |
| Azul petróleo | `#185FA5` | Links, language toggle active, "Regiones" toggle active, "Volver" |
| Amarillo-oliva | `#a7a337` | Financiamiento badge background |
| Fondo neutro | `#F9FAFB` | Page background, KPI cards |
| Blanco | `#FFFFFF` | Header, panel, pills |
| Texto primario | `#111827` | Headings, body, badge text |
| Texto secundario | `#6B7280` | Subtitles, labels, inactive pills |
| Borde | `#E5E7EB` | All separators and card borders |

Contrast: all text/background pairs meet WCAG AA (≥ 4.5:1).

### Colors — map categories (semantic, fixed)
`#0F6E56` anp · `#185FA5` cuenca · `#3C3489` costero · `#BA7517` paisaje · `#993C1D` especie

### Typography (Google Fonts)
- **Lato** 600/700 — headings, buttons, pills, KPI values, stat numbers.
- **Open Sans** 400/600 — body, labels, badges, tooltips.
- Scale: panel title 24px · program name 22px · header title 18px · body 14px · descriptions/states 13px · pills 12.5px · subtitle/labels 12px · section labels 11.5px uppercase · region labels 11px.

### Radii, borders, shadows, motion
- Border-radius: **8px** cards/buttons/tooltips · **20px** pills/badges/language toggle · **50%** bubbles/dots.
- No decorative shadows; zones separated with `1px solid #E5E7EB` only. (Sole exception: the 1px dark ring on map bubbles for contrast against tiles.)
- Transitions: `0.2s ease`. Pulse keyframe: 1.6s ease-out infinite.
- Spacing: header padding 10px 20px · panel padding 24px · card stack gap 18px · KPI grid gap 10px · pill gap 8px.

## Accessibility

- `aria-pressed` on all toggles (pills, ES/EN, Regiones); `aria-label` on filter pills, region toggle, and the "Ver ficha completa" button.
- Full keyboard operation: pills/buttons are native `<button>`s; map markers focusable with Enter activation.
- Panel container has `aria-live="polite"` so selection changes are announced.
- `document.documentElement.lang` tracks the active language.

## Data

The `programas` array (17 markers; CONECTA and ORIGEN share one) is hardcoded in the file, sourced from `Dataimpacto.md` / `Contenido.md`. Field correspondence to the production `Programa` entity (`4_datastr.md` §4.1):

| Prototype field | Production field |
|---|---|
| `id` | `programa_id` |
| `nombre` | `nombre` |
| `lat`, `lng` | `centroide_lat`, `centroide_lng` |
| `tipo_intervencion` | `tipo_intervencion` (identical enum) |
| `ha` | `ha_protegidas + ha_manejo_sostenible` |
| `financiamiento` | `donante` + `monto_usd` (free text here; gated by `nivel_acceso_financiero` in production) |
| `estados` | `estados` (descriptive string here; `Array[String]` in production) |
| `descripcion` / `descripcion_en` | — (editorial text, prototype-only) |
| `kpis.*` | `ha_protegidas + ha_manejo_sostenible`, `personas_beneficiadas`, `organizaciones_locales`, `especies_prioritarias` |

`color` is derived from `tipo_intervencion` at render time — never stored.

## Assets

- **FMCN logo**: placeholder only (green square with "FMCN" text). Substitute the real brand asset.
- **Map tiles**: CartoDB Positron via CDN (requires CARTO attribution).
- **Fonts**: Lato + Open Sans via Google Fonts CDN.
- **Region polygons**: rough hand-approximated coordinates, exploratory only — replace with real GeoJSON if the layer is kept.
- No other images or icons; arrows (↗, ←, ·) are plain text characters.

## Files

- `mapa_impacto_fmcn.html` — the complete prototype: all CSS in a single `<style>` block, all data and logic in a single `<script>` block. CDN dependencies: Leaflet 1.9.4 (pinned, SRI), Chart.js 4.4.9, Google Fonts.

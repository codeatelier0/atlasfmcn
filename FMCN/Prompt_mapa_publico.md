**Prompt para generación de prototipo UX — Mapa de Impacto FMCN**

---

Crea un prototipo HTML de una sola página llamado `mapa_impacto_fmcn.html`. Es una herramienta de comunicación y datos para el Fondo Mexicano para la Conservación de la Naturaleza (FMCN). El diseño debe ser limpio, editorial y profesional — inspirado en plataformas como Mapbox Stories o los reportes interactivos de National Geographic.

**Stack técnico permitido:**

- HTML5 + CSS3 + JavaScript vanilla
- Leaflet.js (CDN) para el mapa base
- Chart.js (CDN) para gráficas internas
- Fuentes: Lato (encabezados/botones) y Open Sans (cuerpo/formularios) vía Google Fonts — tipografía institucional FMCN (`visualbrand.md`)
- Sin frameworks CSS (no Bootstrap, no Tailwind)

---

**Alcance de este prompt — prototipo estático, no el sistema completo**

Este prompt **no** debe generar el sistema de producción descrito en `prompt_mapa_privado.md` / `promptsistema.md` (app Django + HTMX + PostGIS, con modelos, vistas, permisos, fixtures y base de datos real). El resultado esperado es **un prototipo estático**: un único archivo HTML autocontenido (`mapa_impacto_fmcn.html`), sin backend, sin API y sin conexión a base de datos, que funcione abriéndolo directamente en el navegador.

Este archivo es un artefacto independiente pensado para **cargarse o embeberse más adelante dentro del sistema de producción** (ej. como `<iframe>`, tal como contempla `prompt_mapa_privado.md` en "Diseño y responsividad"; o como referencia visual/funcional para construir `templates/mapa/index.html` y `static/mapa/js/mapa.js`). Leaflet cumple aquí el mismo rol que en producción (mapa, marcadores, popups); Chart.js es el componente complementario de gráficas (`6_stack.md` §6.3), válido en ambos contextos. Las interacciones de filtros/panel que aquí son JS vanilla se implementan en producción como fragmentos HTMX servidos por Django (`prompt_mapa_privado.md`).

**Fuentes de datos y contenido — todo hardcoded**

- `Dataimpacto.md` — datos cuantitativos por programa: ubicación, hectáreas, financiamiento, personas beneficiadas, organizaciones, especies. Es la fuente del array `programas` y de las cifras de la barra de estadísticas globales (Componente 4).
- `Contenido.md` — textos editoriales: introducción general, fichas por programa (condensadas a 2-3 líneas para `descripcion`) y cierre/llamada a la acción.
- `visualbrand.md` — identidad visual institucional de fmcn.org (tipografía, paleta, accesibilidad, idiomas) para el cromado de UI (header, footer, botones, badges). No aplica a los colores de `tipo_intervencion` del mapa, que son una codificación semántica fija definida en `prompt_mapa_privado.md` / `4_datastr.md`.

No usar `fetch()`, `XMLHttpRequest`, APIs externas (salvo CDNs de Leaflet/Chart.js/Google Fonts) ni ninguna conexión a base de datos: toda la información vive en constantes JS dentro del mismo archivo.

> **Coherencia con `prompt_mapa_privado.md` (Zona 3):** este prototipo reutiliza sin reinterpretarlas las siguientes definiciones de `prompt_mapa_privado.md` / `4_datastr.md` §4.1: el enum `tipo_intervencion` (`anp`/`cuenca`/`costero`/`paisaje`/`especie`) y su tabla de colores, la visualización base del mapa (CartoDB Positron, centro México lat 23.6345 / lng -102.5528, zoom 5) y la lógica de radio de burbuja (∝ `ha_protegidas + ha_manejo_sostenible`). El array `programas` es un subconjunto ilustrativo de la entidad `Programa`; ver tabla de correspondencia de campos al final de este documento.

---

**Layout general — dos columnas fijas:**

```
┌─────────────────────────────────────────────────────────┐
│  HEADER: logo FMCN   |  título   |  filtros globales    │
├───────────────────────┬─────────────────────────────────┤
│                       │                                  │
│   MAPA LEAFLET        │   PANEL LATERAL                  │
│   (65% ancho)         │   (35% ancho, scroll propio)     │
│                       │                                  │
│                       │                                  │
├───────────────────────┴─────────────────────────────────┤
│  BARRA DE ESTADÍSTICAS GLOBALES (full width, fija abajo) │
└─────────────────────────────────────────────────────────┘
```

---

**Componente 1 — Header**

- Fondo blanco, borde inferior `1px solid #e5e7eb`
- Izquierda: placeholder rectangular para logo FMCN (40×40px, fondo `#0F6E56`, texto "FMCN" en blanco)
- Centro (alineación centrada, `visualbrand.md` § Componentes de interfaz): título `"Impacto territorial 2025"` en **Lato** 18px semibold + subtítulo `"Fondo Mexicano para la Conservación de la Naturaleza"` en **Open Sans** 12px gris
- Selector de idioma `ES / EN` junto al título (toggle simple que alterna los textos visibles del prototipo; ver `visualbrand.md` § Idiomas y accesibilidad)
- Derecha: botones-filtro tipo pill seleccionables, uno por cada valor de `tipo_intervencion` (`4_datastr.md` §4.1, mismo filtro "Tipo de intervención" de `3_bi.md` §3.3) más `Todos`: `Todos` · `ANP federales` · `Cuencas hidrográficas` · `Costero-marino` · `Paisaje productivo` · `Especie / fondo patrimonial`. El activo tiene fondo `#0F6E56` y texto blanco; los inactivos son outline gris. Estas pills funcionan también como leyenda de colores, equivalente a la leyenda de `tipo_intervencion` de `prompt_mapa_privado.md` (esquina inferior izquierda del mapa de producción).

---

**Componente 2 — Mapa Leaflet**

- Tile base: `CartoDB.Positron` (neutro, sin saturación)
- Vista inicial: México centrado, zoom 5
- Marcadores circulares SVG con radio proporcional a hectáreas. Escala: ≤10k ha = r8, 10k–100k = r12, 100k–500k = r16, >500k = r22. La métrica `ha` corresponde a `ha_protegidas + ha_manejo_sostenible` (`4_datastr.md` §4.1); `prompt_mapa_privado.md` usa la misma suma con escala continua — esta escala discreta es la versión simplificada para el prototipo estático.
- Colores por `tipo_intervencion` (idénticos a la tabla "Colores de `tipo_intervencion`" de `prompt_mapa_privado.md`, Zona 3):
    - `#0F6E56` — `anp` (ANP federales)
    - `#185FA5` — `cuenca` (cuencas hidrográficas)
    - `#3C3489` — `costero` (costero-marino)
    - `#BA7517` — `paisaje` (paisaje productivo)
    - `#993C1D` — `especie` (especie / fondo patrimonial)
- Al hacer hover sobre un marcador: tooltip flotante con nombre del programa y cifra principal (hectáreas o beneficiarios)
- Al hacer clic en un marcador: el panel lateral derecho se actualiza con la ficha completa del programa. El marcador seleccionado recibe un anillo exterior pulsante (CSS animation) — indica *selección*, distinto del recoloreo por `tendencia` de la capa "Semáforo de KPI" de `prompt_mapa_privado.md` (verde/amarillo/rojo), que no forma parte de este prototipo.
- Capa secundaria opcional (toggle en el mapa): polígonos semitransparentes de las 6 grandes regiones biogeográficas de México en gris `rgba(0,0,0,0.06)` con etiqueta de texto. Esta capa es exploratoria del prototipo y no corresponde a ninguna de las seis capas de Zona 3 de `prompt_mapa_privado.md` / `3_bi.md` §3.4; no se traduce 1:1 a producción.

**Datos de marcadores a incluir (array JS hardcodeado):**

javascript

```javascript
const programas = [
  { id: "accion", nombre: "ACCIÓN", lat: 19.5, lng: -89.5,
    tipo_intervencion: "costero", color: "#3C3489",
    ha: 2000000, financiamiento: "USD 25M GCF",
    estados: "Campeche, Q. Roo, Yucatán",
    descripcion: "Adaptación basada en ecosistemas para 20 ANP costeras y marinas frente al cambio climático.",
    kpis: { hectareas: "2,000,000", personas: "N/D", organizaciones: 20, especies: "N/D" } },

  { id: "conecta", nombre: "CONECTA / ORIGEN", lat: 16.8, lng: -93.1,
    tipo_intervencion: "cuenca", color: "#185FA5",
    ha: 1100000, financiamiento: "GEF/Banco Mundial (CONECTA) · GEF-8/CI (ORIGEN)",
    estados: "Chiapas, Chihuahua, Jalisco, Veracruz",
    descripcion: "Planes de adaptación en microcuencas (PAMIC) en 15 cuencas prioritarias. Restauración de paisajes degradados.",
    kpis: { hectareas: "1,100,000", personas: 917, organizaciones: "N/D", especies: "N/D" } },

  { id: "rios", nombre: "RÍOS", lat: 20.6, lng: -104.0,
    tipo_intervencion: "cuenca", color: "#185FA5",
    ha: 5885, financiamiento: "USD 9M GCF",
    estados: "Jalisco, Veracruz",
    descripcion: "Restauración hidrológica y resiliencia climática en cuencas Ameca-Mascota y Jamapa.",
    kpis: { hectareas: "5,885", personas: 3577, organizaciones: 12, especies: "N/D" } },

  { id: "cosmos", nombre: "CoSMoS", lat: 19.8, lng: -99.5,
    tipo_intervencion: "anp", color: "#0F6E56",
    ha: 1921, financiamiento: "KfW",
    estados: "Centro de México — 19 ANP",
    descripcion: "Brigadas de incendios, monitoreo de especies amenazadas y restauración en 19 ANP federales.",
    kpis: { hectareas: "1,921", personas: 853, organizaciones: "N/D", especies: 36 } },

  { id: "sierra-mar", nombre: "Sierra y Mar", lat: 22.5, lng: -98.8,
    tipo_intervencion: "anp", color: "#0F6E56",
    ha: 500000, financiamiento: "KfW / FMCN patrimonial",
    estados: "Noreste, Sierra Madre Oriental, Eje Neovolcánico",
    descripcion: "Fortalecimiento de 14 ANP: brigadas, turismo de naturaleza y manejo de cuencas.",
    kpis: { hectareas: "500,000", personas: "N/D", organizaciones: 14, especies: "N/D" } },

  { id: "ojos", nombre: "Cuenca de Los Ojos", lat: 30.5, lng: -109.2,
    tipo_intervencion: "paisaje", color: "#BA7517",
    ha: 50000, financiamiento: "Fondo Wyss / FMCN",
    estados: "Sonora (frontera Arizona)",
    descripcion: "Corredor biológico binacional México-EUA. 9 ranchos privados certificados como ADVC.",
    kpis: { hectareas: "50,000", personas: "N/D", organizaciones: 9, especies: "N/D" } },

  { id: "monarca", nombre: "Fondo Mariposa Monarca", lat: 19.6, lng: -100.2,
    tipo_intervencion: "especie", color: "#993C1D",
    ha: 12367, financiamiento: "Fondo patrimonial",
    estados: "Michoacán, Estado de México",
    descripcion: "Protección del 91% de la zona núcleo de la Reserva de la Biosfera. Pagos por conservación a 33 ejidos.",
    kpis: { hectareas: "12,367", personas: "N/D", organizaciones: 33, especies: 1 } },

  { id: "golfo-california", nombre: "Fondo Golfo de California", lat: 27.5, lng: -111.0,
    tipo_intervencion: "costero", color: "#3C3489",
    ha: 800000, financiamiento: "Fondo patrimonial / Lindblad-NatGeo",
    estados: "Baja California, Sonora, Sinaloa, Nayarit",
    descripcion: "136 iniciativas desde 2001. Restauración coralina en Cabo Pulmo y conservación marina.",
    kpis: { hectareas: "800,000", personas: "N/D", organizaciones: 52, especies: "N/D" } },

  { id: "mex3030", nombre: "MEx30x30", lat: 17.0, lng: -96.5,
    tipo_intervencion: "anp", color: "#0F6E56",
    ha: 98000000, financiamiento: "GBFF / GEF / Conservation International",
    estados: "Nacional — 232 ANP federales",
    descripcion: "Contribución de México a la meta global de proteger el 30% del territorio para 2030.",
    kpis: { hectareas: "98,000,000", personas: "N/D", organizaciones: "N/D", especies: 425 } },

  { id: "csam", nombre: "C-SAM / Arrecife Mesoamericano", lat: 20.5, lng: -87.3,
    tipo_intervencion: "costero", color: "#3C3489",
    ha: 120000, financiamiento: "FFEM, KfW, Summit Foundation",
    estados: "Quintana Roo — Caribe mexicano",
    descripcion: "40 proyectos desde 2015 en el segundo arrecife más grande del mundo. Cooperativas pesqueras y gobernanza marina.",
    kpis: { hectareas: "120,000", personas: "N/D", organizaciones: 40, especies: "N/D" } },

  { id: "fanp", nombre: "FANP — Fondo para ANP", lat: 23.6345, lng: -102.5528,
    tipo_intervencion: "anp", color: "#0F6E56",
    ha: 53477130, financiamiento: "Fondo patrimonial FMCN",
    estados: "Nacional — de 70 a 95 ANP federales (2026)",
    descripcion: "Fondo patrimonial de largo plazo que complementa el presupuesto público de CONANP: vigilancia, monitoreo y atención a contingencias en ANP federales.",
    kpis: { hectareas: "53,477,130", personas: "N/D", organizaciones: "N/D", especies: 425 } },

  { id: "cuencas-ciudades", nombre: "Cuencas y Ciudades", lat: 19.9, lng: -99.5,
    tipo_intervencion: "cuenca", color: "#185FA5",
    ha: 1755, financiamiento: "Fundación Gonzalo Río Arronte",
    estados: "Cuencas que abastecen ciudades de México",
    descripcion: "Conservación, restauración y reconversión productiva en cuencas que abastecen ciudades. 2,710 personas han adoptado prácticas sostenibles.",
    kpis: { hectareas: "1,755", personas: 2710, organizaciones: "N/D", especies: "N/D" } },

  { id: "c6", nombre: "C6 — Cuencas costeras", lat: 22.0, lng: -101.0,
    tipo_intervencion: "costero", color: "#3C3489",
    ha: 0, financiamiento: "GEF / Banco Mundial · FGM / FONNOR",
    estados: "Cuencas costeras del Golfo de México y Golfo de California",
    descripcion: "Conservación de biodiversidad y mitigación climática en 16 cuencas costeras vulnerables, con 10 ANP en su fase original.",
    kpis: { hectareas: "N/D", personas: "N/D", organizaciones: "N/D", especies: "N/D" } },

  { id: "fomafur", nombre: "FOMAFUR", lat: 21.0, lng: -101.5,
    tipo_intervencion: "anp", color: "#0F6E56",
    ha: 1260, financiamiento: "Fondo patrimonial / U.S. Forest Service",
    estados: "35 ANP y zonas de influencia en 16 estados",
    descripcion: "Fondo especializado en manejo del fuego y restauración forestal: 38 brigadas de fuego y 108 proyectos con 54 organizaciones.",
    kpis: { hectareas: "1,260", personas: 466, organizaciones: 54, especies: "N/D" } },

  { id: "conserva-aves", nombre: "Conserva Aves", lat: 18.5, lng: -97.0,
    tipo_intervencion: "especie", color: "#993C1D",
    ha: 0, financiamiento: "National Audubon Society / Global Affairs Canada",
    estados: "8 estados — sitios prioritarios para aves",
    descripcion: "Identifica y protege sitios críticos para aves amenazadas, endémicas y migratorias. En 2025, 12 iniciativas fueron seleccionadas para crear o ampliar ADVC.",
    kpis: { hectareas: "N/D", personas: "N/D", organizaciones: "N/D", especies: "N/D" } },

  { id: "jorge-de-alba", nombre: "Fondo Jorge de Alba", lat: 18.0, lng: -99.5,
    tipo_intervencion: "paisaje", color: "#BA7517",
    ha: 0, financiamiento: "Alianza AMCROLET (monto N/D)",
    estados: "Guerrero, Jalisco, Michoacán, San Luis Potosí, Tabasco, Veracruz",
    descripcion: "Conservación y uso sostenible de bovinos criollos tropicales mediante selección de sementales y bancos de semen de alta calidad.",
    kpis: { hectareas: "N/D", personas: "N/D", organizaciones: "N/D", especies: "N/D" } }
];
```

**Correspondencia de campos con `Programa` (`4_datastr.md` §4.1):**

| Campo en `programas` (prototipo) | Campo en `Programa` (producción) |
|---|---|
| `id` | `programa_id` |
| `nombre` | `nombre` |
| `lat`, `lng` | `centroide_lat`, `centroide_lng` |
| `tipo_intervencion` | `tipo_intervencion` (idéntico) |
| `ha` | `ha_protegidas + ha_manejo_sostenible` |
| `financiamiento` | `donante` + `monto_usd` (texto libre aquí; en producción sujeto a `nivel_acceso_financiero`, ver `3_bi.md` §3.1.1) |
| `estados` | `estados` (aquí string descriptivo; en producción `Array[String]`) |
| `descripcion` | — (no existe en `Programa`; texto editorial propio del prototipo) |
| `kpis.hectareas` | `ha_protegidas + ha_manejo_sostenible` |
| `kpis.personas` | `personas_beneficiadas` |
| `kpis.organizaciones` | `organizaciones_locales` |
| `kpis.especies` | `especies_prioritarias` |

`color` se deriva de `tipo_intervencion` vía la tabla de colores anterior; en producción no se almacena, lo calcula `mapa.js` (`prompt_mapa_privado.md`, `renderBubbles`).

Estos 17 programas corresponden a las fichas individuales de `Dataimpacto.md` / `Contenido.md` (CONECTA y ORIGEN comparten un solo marcador). Los 26 proyectos de la cartera 2025 incluyen programas adicionales sin ficha pública individual, que no se representan como marcador; los KPIs globales (Componente 3) y la barra de estadísticas (Componente 4) reflejan la cartera completa.

---

**Componente 3 — Panel lateral derecho**

Estado por defecto (sin selección): mostrar tarjeta de bienvenida con:

- Texto introductorio breve (2-3 líneas, condensado de `Contenido.md` § "Texto de introducción general"): FMCN, 26 proyectos activos, 53.5M ha financiadas, 369 organizaciones locales, 425 especies prioritarias.
- Los 4 KPIs globales en grid 2×2:
  - 53.5M ha protegidas
  - 26 proyectos activos
  - 369 organizaciones locales
  - 425 especies prioritarias
- Enlace `"Conoce más ↗"` a `fmcn.org`, tomado de `Contenido.md` § "Texto de cierre / llamada a la acción".

Estado activo (programa seleccionado):

```
┌─────────────────────────────────┐
│  ● [color]  NOMBRE PROGRAMA     │  ← header con color de tipo_intervencion
│  Estados / región               │
├─────────────────────────────────┤
│  Descripción editorial (2-3     │
│  líneas, font-size 13px)        │
├─────────────────────────────────┤
│  KPIs en grid 2×2:              │
│  Hectáreas | Personas           │
│  Orgs      | Especies           │
├─────────────────────────────────┤
│  Financiamiento:  [badge]       │
├─────────────────────────────────┤
│  Mini gráfica de barras         │
│  comparando este programa vs    │
│  promedio del portafolio        │
│  (Chart.js, 120px de alto)      │
└─────────────────────────────────┘
```

Badge de `Financiamiento`: fondo `#a7a337` (amarillo-oliva institucional, `visualbrand.md`), texto `#111827`, border-radius 20px (mismo radio que las pills del header).

Botón al final del panel: `"Ver ficha completa ↗"` que dispara `console.log('abrir ficha: ' + id)` (placeholder para routing futuro).

---

**Componente 4 — Barra de estadísticas globales (footer fijo)**

Fondo `#0F6E56`, texto blanco, height 52px, flex row con 5 métricas separadas por divisores verticales:

`53.5M ha financiadas` · `26 proyectos` · `3,189 donativos` · `125,661 personas` · `232 ANP federales`

---

**Comportamiento de filtros:**

Cuando se activa un filtro de `tipo_intervencion` (pill del header), los marcadores que no son de ese tipo reducen opacidad a 0.15. Los marcadores del tipo activo mantienen opacidad 1.0 y aumentan ligeramente su radio — mismo criterio de atenuación (opacity 0.1) que usa `mapa.js` en `prompt_mapa_privado.md` para los filtros de Zona 2. El panel lateral vuelve al estado de bienvenida.

---

**Especificaciones visuales generales (alineadas a `visualbrand.md`):**

- **Tipografía** (Google Fonts): **Lato** (600/700) para títulos, subtítulos y botones; **Open Sans** (400) para cuerpo, etiquetas y badges. Jerarquía: títulos de sección ~24-28px, subtítulos ~16-18px, cuerpo 14px, texto secundario 12-13px.
- **Paleta institucional FMCN** (cromado de UI — header, footer, botones, badges, enlaces): `#0F6E56` (turquesa/verde azulado, acento principal), `#185FA5` (azul petróleo, acentos/enlaces), `#a7a337` (amarillo-oliva, encabezados secundarios y badges destacados, `visualbrand.md`), `#F9FAFB`/`#FFFFFF` (fondos neutros), `#111827` (texto primario), `#6B7280` (texto secundario). Contraste texto/fondo ≥ 4.5:1 (WCAG).
- **Paleta de categorías del mapa** (`tipo_intervencion`, codificación semántica fija de `prompt_mapa_privado.md` — no se mezcla con la paleta institucional): `#0F6E56` `anp`, `#185FA5` `cuenca`, `#3C3489` `costero`, `#BA7517` `paisaje`, `#993C1D` `especie`.
- Border-radius: 8px para cards, 20px para pills y badges; botones de color sólido con área interactiva amplia.
- Sin sombras decorativas; bordes `1px solid #E5E7EB` para separar zonas.
- Transiciones CSS: `0.2s ease` en hover y selección.
- Accesibilidad: `aria-label` en pills/botones de filtro y en el botón "Ver ficha completa"; navegación e interacción completas por teclado (tab/enter) en pills y panel lateral.
- Responsivo (`visualbrand.md` § Accesibilidad y experiencia de usuario): en pantallas < 768px, las columnas Mapa/Panel se apilan verticalmente (mapa arriba a ancho completo, panel debajo); header y footer permanecen full-width.
- El prototipo debe funcionar abriendo el archivo HTML directamente en un navegador (sin servidor local).

---

**Entregable esperado:** un único archivo `mapa_impacto_fmcn.html` funcional, **estático y autocontenido** (sin backend, sin base de datos; todos los datos y textos hardcoded a partir de `Dataimpacto.md` y `Contenido.md`), con Leaflet y Chart.js cargados desde CDN. Debe funcionar abriéndolo directamente en el navegador y ser embebible vía `<iframe>` dentro del sistema de producción (`prompt_mapa_privado.md`).
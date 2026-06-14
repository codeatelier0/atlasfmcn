**Prompt para generación de prototipo — Landing privada Atlas FMCN**

---

## Contexto

Este prompt construye la **pantalla de entrada del sitio privado** de la Plataforma de Inteligencia Territorial Atlas FMCN, descrita en `promptsistema.md` §2.2 ("Versión privada") y §7.2 ("Estructura de navegación — versión privada"), donde la raíz del árbol es `Dashboard personal`.

Debe ser coherente con:

- `promptsistema.md` §2.2 — roles de acceso (Administrador FMCN, Equipo técnico de proyecto, Donante institucional) y **Principio de aislamiento**.
- `promptsistema.md` §7.2 — árbol de navegación privada completo: Mis proyectos, Mapa avanzado, BI & Indicadores, Repositorio de datos, Generar reporte, Alertas territoriales, Matriz de priorización, Administración.
- `promptsistema.md` §8.2 — auditoría: log de acceso a datos sensibles con trazabilidad por usuario; cifrado en tránsito/reposo.
- `visualbrand.md` — identidad visual institucional FMCN (tipografía, paleta, accesibilidad, idiomas).
- `Prompt_mapa_publico.md` / `prompt_mapa_privado.md` — el prototipo del mapa interactivo (`mapa_impacto_fmcn.html`) al que esta landing debe enlazar.
- `promptlanding.md` (documento hermano de este prompt) — el prototipo del tablero BI (`dashboard_bi_fmcn.html`) al que esta landing debe enlazar.
- `3_bi.md` §3.2 — KPIs globales de cartera, usados para la franja de bienvenida.

No inventar roles, secciones de navegación o accesos fuera de los definidos en `promptsistema.md` §2.2 y §7.2.

## Alcance — prototipo estático, no el sistema completo

Este prompt **no** debe generar el sistema de producción (app Django con auth real, MFA `django-otp`/SSO, RBAC vía Django Groups/Permissions, RLS en PostgreSQL — `promptsistema.md` §8.2, `6_stack.md` §6.3). El resultado esperado es **un prototipo estático**: un único archivo HTML autocontenido (`landing_privado_fmcn.html`), sin backend, sin API, sin autenticación real y sin conexión a base de datos, que funcione abriéndolo directamente en el navegador.

Este archivo simula la pantalla que vería un usuario **ya autenticado** en el sitio privado. El login/MFA no se implementa; en su lugar, un **selector de rol** (ver sección "Roles y principio de aislamiento") simula los tres perfiles de `promptsistema.md` §2.2 para mostrar cómo cambia la interfaz según el rol — esto es exploratorio del prototipo y no sustituye la implementación real de RBAC, que ocurre en las vistas Django, nunca solo en el cliente.

## Stack técnico permitido

- HTML5 + CSS3 + JavaScript vanilla.
- Fuentes: **Lato** (encabezados/botones) y **Open Sans** (cuerpo) vía Google Fonts — tipografía institucional FMCN (`visualbrand.md`).
- Sin frameworks CSS (no Bootstrap, no Tailwind), sin Leaflet ni Chart.js (esta pantalla no contiene mapa ni gráficas).

## Fuentes de datos y contenido — todo hardcoded

- `promptsistema.md` §2.2 — tabla de roles y accesos, y texto del "Principio de aislamiento" (citarlo literalmente en el footer o en un tooltip de ayuda).
- `promptsistema.md` §7.2 — ítems del árbol de navegación privada, usados para los Accesos principales y Accesos secundarios.
- `3_bi.md` §3.2 / `Dataimpacto.md` — KPIs globales de cartera 2025 para la franja de bienvenida: 53,477,130 ha protegidas · 1,204,667 ha manejo sostenible · 125,661 personas · 425 especies prioritarias · 369 organizaciones locales · 26 programas activos.
- `visualbrand.md` — paleta, tipografía, accesibilidad e idiomas (selector ES/EN).

No usar `fetch()`, `XMLHttpRequest`, APIs externas (salvo CDN de Google Fonts) ni conexión a base de datos: toda la información vive en constantes JS/HTML dentro del mismo archivo.

## Roles y principio de aislamiento (`promptsistema.md` §2.2)

Incluir un selector `Ver como: [rol ▾]` en el header con las tres opciones de la tabla de §2.2. Cambiar el rol debe mostrar/ocultar u oponer estado "deshabilitado + candado" a los Accesos principales y secundarios según esta tabla de visibilidad (derivada de §2.2):

| Elemento de navegación | Administrador FMCN | Equipo técnico de proyecto | Donante institucional |
|---|---|---|---|
| **Mapa interactivo avanzado** (capas privadas, exportación) | Acceso completo, todas las capas | Capas de proyectos asignados | Solo capas/proyectos asociados a su financiamiento |
| **BI & Indicadores (Dashboards)** | Todos los programas (26) | Programas asignados al equipo | Solo sus proyectos y métricas asociadas |
| **Repositorio de datos** (shapefiles, capas GIS, datos fuente, descarga) | Acceso completo, incl. reportes en borrador | Datos fuente de proyectos asignados | No disponible (deshabilitado con candado) |
| **Generar reporte** | Todas las plantillas (`promptsistema.md` §5.2) | Plantilla de proyecto asignado | Plantilla "Donante institucional" únicamente |
| **Alertas territoriales** | Todas | De proyectos asignados | Oculto |
| **Matriz de priorización** | Visible | Visible (solo lectura) | Oculto |
| **Administración** (usuarios, capas, log de auditoría) | Visible | Oculto | Oculto |

Al cambiar el selector, las tarjetas/ítems no disponibles para el rol activo se muestran con `opacity: 0.5`, ícono de candado y `aria-disabled="true"` (no se eliminan del DOM, para que el prototipo documente la diferencia entre roles). Un texto auxiliar bajo el selector muestra la frase guía de §2.2: _"Los administradores acceden a todos los datos, incluyendo capas GIS, datos fuente y reportes en borrador. Funcionalidades de descarga de datos y generación de reportes no están disponibles en versiones públicas."_

## Layout general

```
┌────────────────────────────────────────────────────────────────────────┐
│ HEADER: logo FMCN | "Atlas FMCN — Portal privado" | Ver como: [rol ▾]    │
│         | ES/EN | usuario · Cerrar sesión                                │
├────────────────────────────────────────────────────────────────────────┤
│ HERO / BIENVENIDA                                                        │
│ "Hola, [Nombre de ejemplo según rol]" + texto institucional breve        │
│ Franja de 6 KPIs de cartera 2025 (3_bi.md §3.2)                          │
├────────────────────────────────────────────────────────────────────────┤
│ ACCESOS PRINCIPALES (grid de 3 tarjetas grandes)                         │
│ ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐ │
│ │ Mapa interactivo     │ │ BI & Indicadores     │ │ Repositorio de      │ │
│ │ avanzado             │ │ (Dashboards)         │ │ datos               │ │
│ │ → mapa_impacto_      │ │ → dashboard_bi_      │ │ → panel de descarga │ │
│ │   fmcn.html          │ │   fmcn.html          │ │                     │ │
│ └─────────────────────┘ └─────────────────────┘ └─────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ ACCESOS SECUNDARIOS (lista/grid de 5 ítems, según §7.2)                  │
│ Mis proyectos · Alertas territoriales · Matriz de priorización ·         │
│ Generar reporte · Administración                                         │
├────────────────────────────────────────────────────────────────────────┤
│ PANEL "Repositorio de datos" (oculto por defecto, se expande al clic)    │
├────────────────────────────────────────────────────────────────────────┤
│ FOOTER: aviso de confidencialidad/auditoría · versión · fecha de build   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Componente 1 — Header

- Fondo blanco, borde inferior `1px solid #E5E7EB`.
- Izquierda: placeholder rectangular para logo FMCN (40×40px, fondo `#0F6E56`, texto "FMCN" en blanco) + texto **"Atlas FMCN"** (Lato 18px semibold) y subtítulo **"Portal privado"** (Open Sans 12px, color `#6B7280`).
- Centro-derecha: selector `Ver como: [rol ▾]` con las tres opciones de §2.2 (ver sección de roles).
- Selector de idioma `ES / EN` (toggle simple, `visualbrand.md` § Idiomas y accesibilidad).
- Extremo derecho: nombre de usuario de ejemplo (cambia según el rol seleccionado, p. ej. "Ana Torres · Administradora FMCN" / "Equipo CONECTA" / "Fundación Donante X") + botón `Cerrar sesión` que dispara `console.log('logout')` (placeholder; en producción invalida la sesión Django, `promptsistema.md` §8.2).

## Componente 2 — Hero / bienvenida

- Fondo `#0F6E56` con overlay sutil (consistente con `visualbrand.md` § Imágenes y multimedia: degradados en tonos institucionales), texto en blanco.
- Saludo dinámico: `"Hola, [nombre de ejemplo del rol activo]"` (Lato 24-28px).
- Texto institucional breve (2 líneas, Open Sans 14px), condensado de `1_resumen.md`: _"Atlas FMCN centraliza la inteligencia territorial de los 26 programas de conservación del FMCN: mapa interactivo, indicadores de desempeño y repositorio de datos para equipos internos y donantes institucionales."_
- Franja de **6 KPIs** en fila (grid responsive, 6 columnas en desktop → 2 columnas en mobile), tarjetas con fondo blanco semitransparente (`rgba(255,255,255,0.1)`), borde `1px solid rgba(255,255,255,0.25)`, radio 8px:
  - `53.5M ha` protegidas
  - `1.2M ha` manejo sostenible
  - `125,661` personas con prácticas sostenibles
  - `425` especies prioritarias
  - `369` organizaciones locales
  - `26` programas activos

Fuente de estos 6 valores: `3_bi.md` §3.2 / `Dataimpacto.md`. Esta franja es de solo lectura (no interactiva) — su propósito es dar contexto de "dashboard personal" sin duplicar la funcionalidad del tablero BI completo (`dashboard_bi_fmcn.html`).

## Componente 3 — Accesos principales (3 tarjetas)

Grid de 3 columnas (desktop) → 1 columna apilada (mobile, `< 768px`). Cada tarjeta: fondo blanco, borde `1px solid #E5E7EB`, radio 8px, padding 24px, ícono superior (placeholder SVG simple en círculo de 48px con color de acento), título (Lato 18px semibold), descripción (Open Sans 13px, color `#6B7280`), botón inferior tipo pill (radio 20px).

1. **Mapa interactivo avanzado**
   - Ícono: círculo `#0F6E56` con símbolo de pin/mapa.
   - Descripción: _"Explora las capas territoriales, financieras y de biodiversidad de los 26 programas FMCN. Incluye capas privadas (cobertura de financiamiento, KPIs de eficiencia) y exportación a PNG/PDF."_ (`promptsistema.md` §3.3, §3.4)
   - Botón: `Abrir mapa →` con `href="mapa_impacto_fmcn.html"` (target `_blank` o misma pestaña, a definir; recomendado `_blank` para no perder el portal).
   - Badge `Privado` (fondo `#a7a337`, texto `#111827`, radio 20px) en la esquina superior derecha de la tarjeta.

2. **BI & Indicadores (Dashboards)**
   - Ícono: círculo `#185FA5` con símbolo de gráfica de barras.
   - Descripción: _"Tablero de inteligencia de negocios con KPIs de cartera, indicadores de conservación (SPI, RLI, DCI, Carbono, Deforestación, Shannon) e indicadores de eficiencia fiduciaria (SROI, HHI, PER) por programa."_ (`promptsistema.md` §4.1, `4_datastr.md` §4.2/§4.5)
   - Botón: `Abrir dashboard →` con `href="dashboard_bi_fmcn.html"`.
   - Badge `Privado`.

3. **Repositorio de datos**
   - Ícono: círculo `#a7a337` (texto `#111827`) con símbolo de descarga.
   - Descripción: _"Descarga shapefiles, capas GIS (.geojson, .kml) y datos de monitoreo de campo de los 26 programas FMCN para análisis externo."_ (`promptsistema.md` §3.4, §7.2, §8.3)
   - Botón: `Ver archivos disponibles` que despliega/expande el **Panel "Repositorio de datos"** (Componente 5) en lugar de navegar a otra página.
   - Badge `Privado`.

Si el rol activo no tiene acceso a una de estas tres tarjetas (según la tabla de visibilidad de la sección "Roles"), la tarjeta completa pasa a `opacity: 0.5`, el botón se deshabilita (`disabled`, `aria-disabled="true"`) y se agrega un ícono de candado junto al badge `Privado` con tooltip: _"No disponible para tu rol"_.

## Componente 4 — Accesos secundarios

Lista/grid de 5 ítems más pequeños (grid de 5 columnas desktop → 2 columnas mobile), estilo "tile" compacto (ícono pequeño + texto, fondo `#F9FAFB`, borde `1px solid #E5E7EB`, radio 8px, padding 16px), correspondientes al resto del árbol de `promptsistema.md` §7.2:

- **Mis proyectos** — fichas de proyecto (avance financiero, indicadores, próximos hitos). Botón → `console.log('abrir: mis proyectos')`.
- **Alertas territoriales** — alertas de deforestación/presión territorial (`promptsistema.md` §3.3, §8.3). Botón → `console.log('abrir: alertas territoriales')`.
- **Matriz de priorización** — herramienta de apoyo a decisiones estratégicas (`promptsistema.md` §6.2). Botón → `console.log('abrir: matriz de priorización')`.
- **Generar reporte** — selección de plantilla y descarga PDF (`promptsistema.md` §5). Botón → `console.log('abrir: generar reporte')`.
- **Administración** — gestión de usuarios/roles, configuración de capas, log de auditoría (`promptsistema.md` §7.2, solo Administrador FMCN). Botón → `console.log('abrir: administración')`.

Aplicar la misma lógica de `opacity: 0.5` + candado para ítems no disponibles según el rol activo (tabla de la sección "Roles").

## Componente 5 — Panel "Repositorio de datos" (expandible)

Sección oculta por defecto (`display: none` / `max-height: 0` con transición), que se expande debajo de los Accesos principales al hacer clic en "Ver archivos disponibles" de la tarjeta 3. Contenido: lista de archivos descargables, agrupados en dos bloques (`promptsistema.md` §7.2):

**Shapefiles y capas GIS** (origen: fixtures de `prompt_mapa_privado.md`):
- `anp-federales.geojson` — Polígonos ANP federales (SIG CONANP)
- `red-hidrografica.geojson` — Red Hidrográfica Digital (INEGI)
- `uso-suelo.geojson` — Uso de suelo y vegetación Serie VI (INEGI)
- `estados-mx.geojson` — Cobertura de financiamiento por entidad (privado)

**Datos de monitoreo y cartera**:
- `programas.json` — Cartera de 26 programas FMCN 2025 (`4_datastr.md` §4.1)
- `kpi_observaciones.json` — Observaciones de KPIs de conservación (`4_datastr.md` §4.1)
- `cartera-fmcn-2025.csv` — Exportación tabular de la cartera (para uso en Excel/BI externo)

Cada fila: nombre de archivo (Open Sans 13px, monoespaciada para el nombre), descripción corta (`#6B7280`), tamaño de archivo de ejemplo (p. ej. "2.4 MB"), y botón `Descargar` (pill, fondo `#0F6E56`, texto blanco) que dispara `console.log('descargar: <nombre_de_archivo>')` — placeholder para la descarga real servida por Django (`promptsistema.md` §8.3, `6_stack.md` §6.3). Si el rol activo es "Donante institucional", este panel completo se reemplaza por un mensaje: _"El repositorio de datos no está disponible para tu rol. Usa 'Generar reporte' para obtener información de tus proyectos."_ con un botón que enlaza a la tarjeta "Generar reporte".

## Componente 6 — Footer

- Fondo `#111827`, texto `#F9FAFB`/`#6B7280`, padding 24px, font-size 12px.
- Línea 1: _"Plataforma de Inteligencia Territorial Atlas FMCN — Versión privada. Acceso registrado y auditado. Cifrado en tránsito (TLS 1.2+)."_ (`promptsistema.md` §8.2)
- Línea 2: versión del prototipo (`v0.1 — prototipo estático`) + fecha de generación (usar `new Date()` en JS para mostrar la fecha actual de carga).
- Enlace de texto `Volver al sitio público de fmcn.org ↗` (placeholder `href="https://fmcn.org/"`, abre en pestaña nueva).

---

## Especificaciones visuales generales (alineadas a `visualbrand.md`)

- **Tipografía** (Google Fonts): **Lato** (600/700) para títulos, subtítulos y botones; **Open Sans** (400) para cuerpo, etiquetas y badges. Jerarquía: hero ~24-28px, títulos de tarjeta ~18px, cuerpo 14px, texto secundario 12-13px.
- **Paleta institucional FMCN**: `#0F6E56` (turquesa, acento principal), `#185FA5` (azul petróleo, acentos/enlaces), `#a7a337` (amarillo-oliva, badges "Privado" y encabezados secundarios), `#F9FAFB`/`#FFFFFF` (fondos neutros), `#111827` (texto primario / footer), `#6B7280` (texto secundario). Contraste texto/fondo ≥ 4.5:1 (WCAG).
- Border-radius: 8px para tarjetas/tiles, 20px para pills, badges y botones.
- Sin sombras decorativas; separación de zonas mediante bordes `1px solid #E5E7EB` y espaciado generoso (`visualbrand.md` § Componentes de interfaz).
- Transiciones CSS `0.2s ease` en hover, expansión del panel de descargas y cambio de rol.
- Accesibilidad: `aria-label` en selector de rol, selector de idioma, botones de tarjeta y filas de descarga; estados deshabilitados con `aria-disabled="true"`; navegación completa por teclado (tab/enter) en tarjetas, tiles y panel de descargas.
- Responsivo: en `< 768px`, el grid de 3 tarjetas principales y el grid de 5 accesos secundarios se apilan en 1 y 2 columnas respectivamente; la franja de KPIs pasa de 6 a 2 columnas; header se mantiene en una fila con scroll horizontal si es necesario.
- El prototipo debe funcionar abriendo el archivo HTML directamente en el navegador (sin servidor local).

---

**Entregable esperado:** un único archivo `landing_privado_fmcn.html` funcional, **estático y autocontenido** (sin backend, sin base de datos; todos los datos y textos hardcoded a partir de `promptsistema.md` §2.2/§7.2 y `3_bi.md` §3.2 / `Dataimpacto.md`). Debe:

1. Mostrar el selector de rol con las tres opciones de §2.2, actualizando dinámicamente la disponibilidad de tarjetas y accesos secundarios según la tabla de visibilidad.
2. Enlazar la tarjeta "Mapa interactivo avanzado" a `mapa_impacto_fmcn.html` (prototipo de `Prompt_mapa_publico.md`).
3. Enlazar la tarjeta "BI & Indicadores" a `dashboard_bi_fmcn.html` (prototipo de `promptlanding.md`).
4. Expandir el panel "Repositorio de datos" con la lista de archivos descargables al hacer clic en su tarjeta.
5. Funcionar abriéndolo directamente en el navegador, sin errores de consola salvo los `console.log` placeholder documentados.

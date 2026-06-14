# FONDO MEXICANO PARA LA CONSERVACIÓN DE LA NATURALEZA

## Atlas FMCN — Mapa Interactivo de Impacto de Financiamiento

### Documento Viviente de Especificación Funcional · 1. Resumen ejecutivo

|Versión|Fecha|Clasificación|Estado|
|---|---|---|---|
|v1.0|Junio 2025|Borrador para revisión|Propuesta|
|v1.1|Junio 2026|Documentación viva|Prototipo estático funcional (4 pantallas HTML)|

---

## Mapa de documentos del proyecto

Este resumen es el punto de entrada a un conjunto de **documentos vivos**: se actualizan de forma iterativa a medida que avanza el prototipo y se valida con FMCN, y funcionan a la vez como **especificación** y como **fuente de verdad** para los prompts que generan cada pantalla del demo.

|#|Documento|Contenido|Tipo|
|---|---|---|---|
|1|`1_resumen.md`|Resumen ejecutivo y mapa general del proyecto (este documento)|Especificación|
|2|`2_userstory.md`|Historias de usuario, roles, piezas del demo y brechas (§2.7)|Especificación|
|3|`3_bi.md`|Arquitectura del tablero (zonas Z-1 a Z-4), versiones pública/privada|Especificación|
|4|`4_datastr.md`|Modelo de datos (`Programa`, `KPI_Observacion`), catálogo de KPIs, enums|Especificación|
|5|`5_crtaceptacion.md`|Criterios de aceptación por historia de usuario y por prompt de generación|Especificación|
|6|`6_stack.md`|Stack tecnológico recomendado (WordPress + Django/HTMX/PostGIS/Leaflet) y complementos|Especificación|
|7|`7_roadmap.md`|Hoja de ruta de implementación por fases|Especificación|
|8|`8_glosario.md`|Glosario de siglas y términos técnicos/de conservación|Especificación|
|—|`Contenido.md`|Contenido editorial (introducción, fichas por programa, cierre/CTA)|Contenido y datos|
|—|`Dataimpacto.md`|Datos cuantitativos de la cartera 2025 por programa|Contenido y datos|
|—|`Fuentedatos.md`|Diagnóstico de fuentes de datos oficiales por frente estratégico|Contenido y datos|
|—|`visualbrand.md`|Análisis de identidad visual y UX de `fmcn.org` (branding institucional)|Contenido y datos|
|—|`promptsistema.md`|Prompt raíz: arquitectura de acceso, roles, navegación pública/privada|Librería de prompts|
|—|`Prompt_mapa_publico.md`|Prompt generador de `mapa_impacto_fmcn.html` (mapa, prototipo estático)|Librería de prompts|
|—|`prompt_mapa_privado.md`|Prompt de especificación de producción de Zona 3 (Django + HTMX + PostGIS)|Librería de prompts|
|—|`promptdashoard.md`|Prompt generador de `dashboard_bi_fmcn.html` (BI privado)|Librería de prompts|
|—|`promptlandingpriv.md`|Prompt generador de `landing_privado_fmcn.html` (portal privado)|Librería de prompts|

---

## 1. Resumen ejecutivo

### 1.1 Qué es Atlas FMCN

**Atlas FMCN** es la propuesta funcional completa —y su prototipo navegable— de un tablero de inteligencia de negocios integrado a un mapa interactivo de impacto territorial del Fondo Mexicano para la Conservación de la Naturaleza (FMCN). Centraliza los **26 programas de conservación activos en 2025** sobre cartografía oficial de México, con indicadores vinculados a seis KPIs de conservación medibles mediante datos abiertos del gobierno mexicano (CONANP, CONAFOR, CONABIO, INEGI, CONAGUA y SEMARNAT), más KPIs de gestión interna (SROI, HHI, PER) en su versión privada.

El proyecto existe en dos capas, ambas dentro de este mismo repositorio:

- **La especificación funcional** (documentos 1–8 más `Contenido.md`, `Dataimpacto.md`, `Fuentedatos.md`, `visualbrand.md`): el "qué" y el "por qué" del sistema, pensado para producción (Django + HTMX + PostGIS, `6_stack.md`).
- **El prototipo estático** (`portada_atlas_fmcn.html`, `mapa_impacto_fmcn.html`, `landing_privado_fmcn.html`, `dashboard_bi_fmcn.html`): el "cómo se ve y se siente", generado directamente desde la librería de prompts descrita en §1.2, sin backend ni base de datos.

### 1.2 Cómo se generó este sistema: documentación viva + librería de prompts ad hoc

El diseño del sistema y la generación de sus cuatro pantalles HTML se basaron en una **estrategia de documentación viva** combinada con una **librería de prompts desarrollada ad hoc** para este caso práctico. El principio operativo es:

1. **Los documentos 2–8, `Contenido.md`, `Dataimpacto.md`, `Fuentedatos.md` y `visualbrand.md` son la única fuente de verdad** de campos, enums, KPIs, colores, textos y cifras. Ningún prompt puede inventar datos, capas o indicadores fuera de lo definido ahí.
2. **Cada prompt de la librería cita explícitamente, por número de sección (§), el documento del que toma cada dato o regla** — por ejemplo, `Prompt_mapa_publico.md` referencia `4_datastr.md` §4.1 para el enum `tipo_intervencion` y su tabla de colores, y `5_crtaceptacion.md` para las reglas de semáforo.
3. **Los prompts se referencian entre sí**, formando una cadena de dependencias trazable: `promptsistema.md` (raíz) → `Prompt_mapa_publico.md` → `promptdashoard.md` / `promptlandingpriv.md`, con `prompt_mapa_privado.md` como la versión "de producción" de la pieza generada por `Prompt_mapa_publico.md`.
4. **Cada prompt declara su alcance** ("prototipo estático, no el sistema completo") para separar lo que es UI/UX de demostración de lo que requeriría el stack de producción de `6_stack.md`.

Esto convierte a `5_crtaceptacion.md` en un documento de doble función: además de los criterios de aceptación clásicos por historia de usuario, actúa como **criterios de aceptación para el agente de IA generador** — el conjunto de reglas (tiempos de respuesta, colores de semáforo, atenuación de filtros) que cualquier prompt de esta librería debe respetar para que su salida sea válida.

### 1.3 Mapa de prompts → entregables → documentos fuente

|Prompt|Genera|Documentos fuente citados (no exhaustivo)|
|---|---|---|
|`promptsistema.md`|Especificación raíz: arquitectura de acceso (§2), roles, navegación pública (§7.1) y privada (§7.2)|`6_stack.md`, `4_datastr.md`|
|`Prompt_mapa_publico.md`|`mapa_impacto_fmcn.html` — prototipo estático del mapa (público)|`prompt_mapa_privado.md`, `4_datastr.md` §4.1, `Dataimpacto.md`, `Contenido.md`, `visualbrand.md`|
|`prompt_mapa_privado.md`|Especificación de producción de Zona 3 (app Django `mapa/`, modelos GeoDjango/PostGIS, fragmentos HTMX)|`3_bi.md` §3.1.1/§3.3/§3.4/§3.5, `4_datastr.md` §4.1–§4.5, `5_crtaceptacion.md`, `6_stack.md`|
|`promptdashoard.md`|`dashboard_bi_fmcn.html` — tablero BI privado (Zona 1 + Zona 4 adaptada)|`Prompt_mapa_publico.md` (reutiliza el array `programas`), `promptsistema.md` §4.1, `4_datastr.md` §4.2/§4.5, `Dataimpacto.md`, `5_crtaceptacion.md`, `visualbrand.md`|
|`promptlandingpriv.md`|`landing_privado_fmcn.html` — landing del portal privado, simulador de roles|`promptsistema.md` §2.2/§7.2/§8.2, `3_bi.md` §3.2, `visualbrand.md`, enlaza a los dos prototipos anteriores|

### 1.4 Identidad visual y benchmark de mercado

La identidad visual del prototipo no se diseñó desde cero: se documentó primero como **investigación de mercado** y luego se convirtió en un documento vivo (`visualbrand.md`) que todos los prompts citan como fuente de verdad de marca.

- **Auditoría de marca propia**: `visualbrand.md` analiza el sitio institucional `fmcn.org` (tema Divi) y extrae la paleta institucional (`#0F6E56` turquesa, `#185FA5` azul petróleo, `#a7a337` amarillo-oliva), tipografía (Lato para encabezados, Open Sans para cuerpo), radios de borde, criterios de accesibilidad (WCAG ≥ 4.5:1) e idiomas (ES/EN).
- **Benchmark de productos análogos en marcas reconocidas**: `Prompt_mapa_publico.md` toma como referencia explícita de patrón editorial **Mapbox Stories** y los **reportes interactivos de National Geographic** — plataformas reconocidas de comunicación territorial basada en mapas — para el layout de dos columnas (mapa + panel narrativo), el uso de burbujas proporcionales y la jerarquía tipográfica.
- Esta combinación (marca propia auditada + referentes externos reconocidos) define de forma consistente el cromado de las cuatro pantallas: header con logo placeholder, pills de filtro, badges `Privado`, paleta de `tipo_intervencion` (independiente de la paleta institucional) y semáforo de KPI (`5_crtaceptacion.md`).

### 1.5 Arquitectura del prototipo: interconexión de pantallas

El prototipo es un conjunto de **archivos HTML autocontenidos** (sin backend, sin base de datos, abribles directamente en el navegador), enlazados entre sí mediante `<a href>` estándar:

```
                         ┌──────────────────────────────┐
   Sin sesión            │  portada_atlas_fmcn.html      │
   (público) ──────────► │  Portada pública Atlas FMCN   │
                         │  cifras, 5 tipos, programas   │
                         │  destacados, mini-mapa        │
                         └───────────────┬───────────────┘
                                          │ "Ver los programas
                                          │  en el mapa →" / #programas
                                          ▼
                         ┌──────────────────────────────┐
                         │  mapa_impacto_fmcn.html        │◄────────────┐
                         │  Mapa interactivo (Leaflet +    │             │
                         │  Chart.js) — 16/26 programas,   │             │ "Ver KPIs de
                         │  filtros, panel de detalle      │             │  conservación
                         └──────────────────────────────┘             │  en el mapa →"
                                          ▲                              │
   Con sesión simulada                   │ "Abrir mapa →"               │
   (selector de rol) ──────► ┌──────────────────────────────┐          │
                              │  landing_privado_fmcn.html    │          │
                              │  Portal privado, "Ver como:"  │          │
                              │  admin/técnico/donante,        │──────────┘
                              │  repositorio de datos          │  "Abrir dashboard →"
                              └───────────────┬────────────────┘
                                               │
                                               ▼
                              ┌──────────────────────────────┐
                              │  dashboard_bi_fmcn.html        │
                              │  BI & Indicadores — KPIs,       │
                              │  filtros, 4 gráficas Chart.js,  │
                              │  tabla de cartera 2025          │
                              └───────────────┬────────────────┘
                                               │ "← Portal privado"
                                               └──────► landing_privado_fmcn.html
```

|Pantalla|Archivo|Enlaza hacia|Generada por|
|---|---|---|---|
|Portada pública|`portada_atlas_fmcn.html`|`mapa_impacto_fmcn.html` (CTA hero + ancla `#programas`), `fmcn.org`|*(portada, complementaria a la librería de prompts principal)*|
|Mapa interactivo|`mapa_impacto_fmcn.html`|`fmcn.org`, atribuciones Carto/OSM (sin volver a la portada ni al portal)|`Prompt_mapa_publico.md`|
|Landing privada|`landing_privado_fmcn.html`|`mapa_impacto_fmcn.html`, `dashboard_bi_fmcn.html`, `fmcn.org`|`promptlandingpriv.md`|
|BI & Indicadores|`dashboard_bi_fmcn.html`|`landing_privado_fmcn.html` (regreso), `mapa_impacto_fmcn.html` (detalle de KPIs por programa)|`promptdashoard.md`|

`mapa_impacto_fmcn.html` es el **único archivo compartido** entre la versión pública y la privada: la tarjeta "Mapa interactivo avanzado" del portal privado apunta al mismo prototipo (brecha documentada en `2_userstory.md` §2.7, ítem 10 — el demo aún no diferencia capas privadas ni exportación PNG/PDF en este archivo).

Adicionalmente, el caso de estudio completo —incluyendo este mapa de documentos vivos— se presenta como pieza de portafolio en `atlas-fmcn/index.html` (visor React con `marked.js` que renderiza en vivo los documentos 1–8, `Contenido.md`, `Dataimpacto.md`, `Fuentedatos.md`, `visualbrand.md` y los prompts), enlazado desde la página raíz `index.html` del sitio personal.

### 1.6 Cifras de cartera 2025

|Métrica|Valor 2025|
|---|---|
|**Programas activos**|26 proyectos con presencia territorial en México|
|**Donativos**|3,189 donativos gestionados|
|**Hectáreas protegidas**|53,477,130 ha financiadas para protección|
|**Manejo sostenible**|1,204,667 ha con manejo sostenible financiado|
|**Personas impactadas**|125,661 personas adoptando prácticas sostenibles|
|**Especies prioritarias**|425 especies prioritarias atendidas|
|**Orgs. locales**|369 organizaciones locales financiadas|

Fuente: Informe Anual FMCN 2025 (`Dataimpacto.md`). El prototipo modela en detalle 16 de los 26 programas; el resto se presenta como totales agregados de cartera (`2_userstory.md` §2.1).

### 1.7 Alcance actual y brechas conocidas

El prototipo cubre las épicas 1 (exploración geográfica) y parte de la 2 (panel de KPIs); las épicas 3 (línea de tiempo 2015–2025) y 4 (exportación/descarga real) **no están implementadas** en el demo HTML. El detalle completo de las 14 brechas identificadas —y su trazabilidad a la épica de origen— vive en `2_userstory.md` §2.7, que se mantiene como lista viva de backlog/roadmap.

---

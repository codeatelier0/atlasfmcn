## 6. Stack tecnológico recomendado

### 6.1 Stack base

La implementación recomendada para FMCN es **híbrida**: el sitio institucional `fmcn.org` continúa en **WordPress + PHP + MySQL/MariaDB** como capa de publicación y contexto editorial; el mapa interactivo y la lógica territorial operan como una **aplicación geoespacial desacoplada** construida con Django y PostGIS, embebida en WordPress mediante `iframe` para la versión pública.

| Componente | Tecnología | Responsabilidad | Justificación |
|---|---|---|---|
| **Capa de publicación web** | WordPress + PHP + MySQL/MariaDB | Página pública en `fmcn.org` que presenta el contexto institucional, texto curado, CTA, SEO, navegación y el contenedor donde se publica el mapa | Aprovecha la plataforma existente del sitio FMCN sin reimplementar el CMS; permite que el mapa viva dentro de una página editorial administrable por el equipo de comunicación |
| **Frontend interactivo** | HTMX | Fragmentos de página: filtros (Z-2), paneles de detalle (Z-4), tablas y tarjetas KPI (Z-1) | Interactividad tipo SPA sin build step de JS; cada interacción es una petición HTTP que devuelve un fragmento HTML renderizado por Django |
| **Mapa** | Leaflet.js + GeoJSON | Renderizado del mapa (Z-3): marcadores (burbujas de programa), polígonos (ANP, hidrografía, uso de suelo, cobertura de financiamiento) y popups/tooltips | Librería ligera y sin licencia, con soporte maduro para consumir GeoJSON servido por GeoDjango |
| **Backend** | Django | Lógica de negocio, permisos (versión pública/privada, RBAC), cálculo de indicadores (`KPI_Observacion`), templates y fragmentos HTMX | ORM maduro, sistema de auth/permisos integrado, GeoDjango para datos espaciales |
| **Base de datos** | PostgreSQL + PostGIS | Datos espaciales y de impacto: `Programa`, `KPI_Observacion`, capas ANP/hidrografía/uso de suelo/estados; consultas espaciales (intersección estado↔programa, agregación por cuenca/ANP) | Estándar de facto para geoespacial, integración directa con GeoDjango |

### 6.2 Patrón de publicación en WordPress

La solución pública se publica dentro de una **pantalla de WordPress** en `fmcn.org` que combina dos piezas:

1. **Contenido editorial nativo en WordPress**: introducción, narrativa de impacto, explicación de indicadores, enlaces a programas, notas metodológicas y CTA institucionales.
2. **Mapa central interactivo embebido por `iframe`**: aplicación pública servida por Django, con su propio ciclo de renderizado, filtros, KPIs, panel lateral y endpoints GeoJSON.

Este patrón mantiene a WordPress como sistema de publicación y evita trasladar al stack `PHP + MySQL/MariaDB` responsabilidades para las que el diseño funcional depende de `Django + PostGIS`:

- consultas geoespaciales,
- filtrado público/privado a nivel servidor,
- generación de fragmentos HTMX,
- y ETL de capas oficiales.

La versión privada no se recomienda dentro de WordPress; debe operar como aplicación separada con autenticación y permisos gestionados por Django.

### 6.3 Mapeo a la arquitectura del tablero (`3_bi.md`)

| Zona | Stack |
|---|---|
| **Pantalla pública en `fmcn.org`** | WordPress: encabezado, texto explicativo, bloques de contenido, CTA y contenedor responsive del `iframe` |
| **Z-1** Barra de KPIs | HTMX (fragmento `kpi_bar.html`) + Django (agregaciones sobre PostGIS), renderizado dentro de la aplicación embebida |
| **Z-2** Filtros | HTMX (fragmento `filtros.html`); cada cambio dispara `hx-get` que recalcula Z-1/Z-3/Z-4 dentro del `iframe` |
| **Z-3** Mapa | Leaflet + GeoJSON, servido por vistas GeoDjango sobre PostGIS |
| **Z-4** Panel de detalle | HTMX (fragmento `panel_detalle.html`), incluida la tabla de KPIs y descarga CSV según permisos |

La separación pública/privada (`3_bi.md` §3.1.1) se aplica en las **vistas Django** (no solo en el cliente): los campos con `nivel_acceso` / `nivel_acceso_financiero = privado` (`4_datastr.md` §4.1) se filtran en la consulta PostGIS antes de renderizar cualquier fragmento o GeoJSON.

### 6.4 Implicaciones de integración con WordPress

WordPress se limita a publicar y contextualizar la experiencia pública. La integración recomendada considera:

| Necesidad | Implementación recomendada |
|---|---|
| **Publicación del mapa en `fmcn.org`** | Página o plantilla WordPress con bloque HTML personalizado que inserta el `iframe` del mapa |
| **Pantalla informativa alrededor del mapa** | Contenido nativo WordPress: texto, imágenes, metodología, enlaces a programas y llamadas a la acción |
| **Consistencia visual** | Compartir tipografía, paleta, espaciado y header/footer institucional entre WordPress y la app embebida |
| **Responsividad** | `iframe` con contenedor responsive; la app Django debe adaptarse a desktop y mobile sin depender del layout interno de WordPress |
| **SEO / indexación** | La narrativa y el contenido descriptivo deben vivir en WordPress; el `iframe` aporta la experiencia interactiva, no el contenido principal indexable |
| **Aislamiento técnico** | La app Django mantiene su propio despliegue, dominio/subdominio técnico, logs, seguridad y base PostGIS sin acoplarse al core de WordPress |

### 6.5 Componentes complementarios (no cubiertos por el stack base)

El stack WordPress + HTMX + Leaflet + Django + PostGIS cubre la publicación pública y la interacción del tablero, pero **no resuelve** lo siguiente — requiere piezas adicionales:

| Necesidad                                                                                     | Origen del requisito                                       | Por qué no la cubre el stack base                                                                                           | Complemento sugerido                                                                                                           |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Embebido limpio en WordPress**                                                              | Publicación del mapa dentro de `fmcn.org`                  | El stack base define la app interactiva, pero no la capa de embedding ni el ajuste de altura/comunicación visual con el CMS | Página/plantilla WordPress con bloque HTML + `iframe`; opcionalmente `postMessage` para autoajuste de altura y eventos simples |
| **Gráficas comparativas** (mini-gráfica programa vs. portafolio)                              | `Prompt_mapa_publico.md`, panel de detalle                           | Ni HTMX ni Django renderizan gráficas; PostGIS solo agrega datos                                                            | Chart.js (cliente, vía CDN) sobre los datos del fragmento HTMX                                                                 |
| **Exportación de mapa/reportes a PNG/PDF**                                                    | `promptsistema.md` §3.4 y §5.1                             | Leaflet no genera imágenes/PDF; Django no renderiza el canvas del mapa                                                      | `leaflet-image`/`html2canvas` (cliente) + WeasyPrint o ReportLab (Django, servidor)                                            |
| **Rendimiento con geometrías nacionales pesadas** (uso de suelo 1:250,000, hidrografía INEGI) | `3_bi.md` §3.4; `5_crtaceptacion.md` (< 500 ms por filtro) | Leaflet renderiza el GeoJSON completo en cliente; geometrías nacionales pueden exceder el presupuesto de tiempo             | Simplificación con `ST_Simplify` en PostGIS y/o teselas vectoriales (pg_tileserv / Martin) detrás de las vistas Django         |
| **ETL de fuentes oficiales** (CONANP, INEGI, CONAFOR, CONABIO)                                | `Fuentedatos.md`; `7_roadmap.md` fases 2 y 4               | Es un proceso batch de integración, no parte del runtime del tablero                                                        | Pipeline Python (geopandas + GDAL/ogr2ogr) que carga shapefiles/CSV a PostGIS                                                  |
| **Actualización automática de KPIs y alertas**                                                | `7_roadmap.md` fase 4                                      | Django/HTMX son request-response; no hay ejecución programada                                                               | Celery + Redis, o `management commands` programados (cron)                                                                     |

Estos complementos no cambian el principio de arquitectura: **WordPress publica y contextualiza; Django/PostGIS opera el mapa y los datos**.

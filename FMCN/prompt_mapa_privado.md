**Prompt para generación del componente Zona 3 — Mapa central interactivo (FMCN)**

---

## Contexto

Este prompt construye **Zona 3 (Z-3)** del tablero descrito en `3_bi.md` §3.4: el mapa central interactivo del Mapa de Impacto FMCN. Debe ser coherente con:

- `4_datastr.md` §4.1 — estructura de datos (entidades `Programa` y `KPI_Observacion`), que es la **fuente de verdad** de campos, tipos y enums.
- `4_datastr.md` §4.2/4.3/4.5 — catálogo de KPIs y matriz programa↔KPI.
- `3_bi.md` §3.1.1 — el tablero tiene **versión pública** y **versión privada**; toda capa, campo o KPI con `nivel_acceso` / `nivel_acceso_financiero = privado` solo se renderiza en modo privado.
- `3_bi.md` §3.3 — filtros de Zona 2 que el mapa debe escuchar.
- `3_bi.md` §3.5 — panel de detalle (Zona 4) que se despliega al hacer clic en un programa.
- `5_crtaceptacion.md` — reglas de semáforo y rendimiento de filtros.

No inventar capas, KPIs o campos fuera de los definidos en `4_datastr.md`.

## Stack requerido

Alineado con el stack base definido en `6_stack.md` §6.1:

- **Leaflet.js + GeoJSON** — renderizado del mapa (Zona 3): marcadores (burbujas de programa), polígonos (ANP, hidrografía, uso de suelo, cobertura de financiamiento) y popups/tooltips.
- **HTMX** — fragmentos de Zona 1 (KPI cards), Zona 2 (filtros) y Zona 4 (panel de detalle/tabla de KPIs). Cada filtro, clic de marcador o cambio de switch público/privado dispara una petición HTMX (`hx-get`) a una vista Django que devuelve el fragmento HTML actualizado.
- **Django** — vistas que renderizan la página, los fragmentos HTMX y los endpoints GeoJSON consumidos por Leaflet; lógica de negocio (cálculo de KPIs, agregaciones por filtro) y permisos público/privado (`nivel_acceso`, `nivel_acceso_financiero`).
- **PostGIS** — modelos GeoDjango `Programa` y `KPIObservacion`, capas espaciales ANP/hidrografía/uso de suelo/estados; consultas espaciales (intersección estado↔programa, agregación por cuenca/ANP).
- Chart.js (CDN, opcional) — solo para la mini-gráfica comparativa del panel de detalle; complementario al stack base, ver `6_stack.md` §6.3.

## Estructura de archivos

App Django (`mapa/`) con templates + fragmentos HTMX; los datos viven en PostGIS, no en archivos estáticos:

```
mapa/                          ← app Django
├── models.py                  ← Programa, KPIObservacion (GeoDjango / PostGIS)
├── views.py                   ← vista de página completa + endpoints HTMX/GeoJSON
├── urls.py
├── templates/mapa/
│   ├── index.html              ← página completa (Z-1 a Z-4, contenedores hx-target)
│   └── partials/
│       ├── kpi_bar.html         ← Z-1, fragmento HTMX
│       ├── filtros.html         ← Z-2, fragmento HTMX
│       ├── panel_detalle.html   ← Z-4, fragmento HTMX (4 pestañas)
│       └── leyenda.html
├── static/mapa/
│   ├── css/mapa.css
│   └── js/mapa.js              ← solo Leaflet: init, capas GeoJSON, estilos, popups
└── fixtures/                   ← carga inicial a PostGIS (loaddata)
    ├── programas.json            ← entidad Programa (4_datastr §4.1)
    ├── kpi_observaciones.json    ← entidad KPI_Observacion (4_datastr §4.1)
    ├── anp-federales.geojson     ← polígonos SIG CONANP (capa "ANP federales")
    ├── red-hidrografica.geojson  ← Red Hidrográfica Digital INEGI (capa "Red hidrológica")
    ├── uso-suelo.geojson         ← INEGI uso de suelo y vegetación 1:250,000 (capa "Uso de suelo")
    └── estados-mx.geojson        ← polígonos de 32 entidades (capa "Cobertura de financiamiento", privado)
```

Para el prototipo, los GeoJSON de ANP, hidrografía, uso de suelo y estados pueden ser polígonos simplificados/de prueba cargados a PostGIS vía fixtures; en producción deben sustituirse por SIG CONANP, INEGI Hidrografía, INEGI Serie VI (1:250,000) e INEGI Marco Geoestadístico respectivamente (`4_datastr.md` §4.4), idealmente vía pipeline ETL (ver `6_stack.md` §6.3).

## Estructura de datos

Los campos y enums siguen siendo los de `4_datastr.md` §4.1 (fuente de verdad lógica); a continuación su mapeo a modelos GeoDjango/PostGIS:

- `centroide_lat` + `centroide_lng` → un único campo `ubicacion` (`PointField`, SRID 4326).
- `geojson_url` → campo `geom` (`MultiPolygonField`, SRID 4326), nulo si el programa no tiene polígono propio.
- `estados`, `anp_relacionadas`, `cuencas_rha` → `ArrayField(CharField)` (Postgres).
- `tipo_intervencion`, `nivel_acceso_financiero`, `kpi_tipo`, `tendencia`, `geo_nivel`, `nivel_acceso` → `CharField` con `choices` (enums de 4_datastr.md).

Los JSON siguientes representan tanto el formato de los **fixtures** de carga inicial como la forma de los **endpoints GeoJSON/HTMX** que Django expone hacia Leaflet/HTMX (el frontend ya no hace `fetch()` directo a archivos estáticos).

### `programas.json` — entidad `Programa` (4_datastr.md §4.1)

Cada registro debe respetar exactamente estos campos, tipos y enums:

```json
{
  "programa_id": "ACCION_001",
  "nombre": "ACCIÓN",
  "tipo_intervencion": "costero",
  "estados": ["Campeche", "Quintana Roo", "Yucatán"],
  "anp_relacionadas": ["ANP-MX-0012", "ANP-MX-0045"],
  "cuencas_rha": [],
  "donante": "GCF",
  "monto_usd": 25000000,
  "nivel_acceso_financiero": "publico",
  "ha_protegidas": 2000000,
  "ha_manejo_sostenible": 0,
  "personas_beneficiadas": 0,
  "organizaciones_locales": 20,
  "especies_prioritarias": 0,
  "year_inicio": 2021,
  "year_fin": null,
  "centroide_lat": 19.5,
  "centroide_lng": -89.5,
  "geojson_url": null,
  "fuente_url": "https://fmcn.org/2026/06/02/informe-anual-2025/"
}
```

- `tipo_intervencion` ∈ `anp` / `cuenca` / `costero` / `paisaje` / `especie` (Zona 2 §3.3 "Tipo de intervención").
- `monto_usd` + `nivel_acceso_financiero`: si `privado`, el valor existe en el dataset pero **no se envía/renderiza** en la versión pública (queda como `null` en el payload público).
- Campos numéricos sin dato confirmado en `Dataimpacto.md` (marcados "N/D") se capturan como `0`, nunca se omiten.

### `kpi_observaciones.json` — entidad `KPI_Observacion` (4_datastr.md §4.1)

```json
{
  "kpi_obs_id": "KPI-SPI-2025-FANP-001",
  "programa_id": "FANP_001",
  "kpi_tipo": "SPI",
  "valor": 0.82,
  "unidad": "índice 0-1",
  "tendencia": "mejora",
  "año": 2024,
  "fuente_institucion": "CONANP",
  "fuente_url": "https://sig.conanp.gob.mx/",
  "fecha_actualizacion": "2025-01-15",
  "geo_nivel": "anp",
  "geo_clave": "ANP-MX-0001",
  "nivel_acceso": "publico"
}
```

- `kpi_tipo` ∈ `SPI` / `RLI` / `TRA` / `DCI` / `Carbono` / `Deforest.` / `Shannon` / `SROI` / `HHI` / `PER` (4_datastr §4.2 y §4.5).
- `nivel_acceso = privado` aplica a `SROI`, `HHI`, `PER` (4_datastr §4.5). Estas observaciones se excluyen del payload público.
- Cada `programa_id` debe tener al menos una observación por cada KPI marcado con ✓ en la matriz 4_datastr §4.3 (KPIs públicos) y, si el programa pertenece al frente 4 o 5 de `Fuentedatos.md`, observaciones adicionales `SROI`/`HHI`/`PER` (privado).

## Capas del mapa (Zona 3, `3_bi.md` §3.4)

Implementar exactamente estas seis capas, sin agregar ni omitir:

| Capa | Fuente de datos | Render | Visibilidad | Toggle |
|---|---|---|---|---|
| **Burbujas de programa** | `programas.json` | `CircleMarker` en `[centroide_lat, centroide_lng]`, radio ∝ `ha_protegidas + ha_manejo_sostenible`, color por `tipo_intervencion` | Público | Activo por defecto |
| **ANP federales** | `anp-federales.geojson` | Polígonos, borde `#0F6E56`, sin relleno | Público | Opcional |
| **Red hidrológica** | `red-hidrografica.geojson` | Líneas, color `#185FA5` | Público | Opcional |
| **Uso de suelo** | `uso-suelo.geojson` | Polígonos coropléticos por clase de cobertura | Público | Opcional |
| **Semáforo de KPI** | `kpi_observaciones.json` filtrado por `kpi_tipo` seleccionado en Zona 2 | Recolorea el borde de burbujas/polígonos según `tendencia` (ver reglas abajo); `geo_nivel` determina si aplica a programa, ANP o cuenca | Público | Opcional |
| **Cobertura de financiamiento** | `estados-mx.geojson` + `programas.json` (`monto_usd` donde `nivel_acceso_financiero = privado`, agregado por estado vía `estados`) | Coropleta por entidad federativa | **Privado** | Opcional (oculto/disabled en modo público) |

Las capas **Red hidrológica** y **Uso de suelo** usan geometrías nacionales (INEGI 1:250,000) que pueden exceder el presupuesto de < 500 ms (`5_crtaceptacion.md`) si se sirven como GeoJSON crudo. Aplicar `ST_Simplify` en la consulta PostGIS antes de exponer el endpoint, y considerar teselas vectoriales si persiste el problema — ver `6_stack.md` §6.3.

Colores de `tipo_intervencion`:

| Valor | Color |
|---|---|
| `anp` | `#0F6E56` |
| `cuenca` | `#185FA5` |
| `costero` | `#3C3489` |
| `paisaje` | `#BA7517` |
| `especie` | `#993C1D` |

## Filtros (Zona 2, `3_bi.md` §3.3)

El mapa debe escuchar y aplicar en modo AND (intersección):

- **Tipo de intervención** → filtra por `tipo_intervencion`.
- **Estado / región** → filtra programas cuyo array `estados` intersecta la selección.
- **KPI de conservación** → activa la capa "Semáforo de KPI" para el `kpi_tipo` elegido. Opciones públicas: SPI, RLI, TRA, DCI, Carbono, Deforest., Shannon. Opciones privadas (solo si versión = privada): SROI, HHI, PER.
- **Donante / fondo** → filtra por `donante`.
- **Periodo** → slider 2015–2025; un programa es visible si `year_inicio <= año_seleccionado` y (`year_fin` es `null` o `año_seleccionado <= year_fin`).
- **Escala de burbuja** → recalcula el radio usando `ha_protegidas + ha_manejo_sostenible`, `personas_beneficiadas`, o `monto_usd` (esta última solo si el dato es visible según `nivel_acceso_financiero` / versión activa).

Cada cambio de filtro debe re-renderizar en < 500 ms (`5_crtaceptacion.md`). Implementación: el formulario de Zona 2 usa `hx-get` hacia la vista Django, que recalcula sobre PostGIS y devuelve los fragmentos `kpi_bar.html` (Z-1) y `panel_detalle.html` si aplica, además de un endpoint GeoJSON filtrado que `mapa.js` consume para re-pintar la Zona 3, atenuando (opacity 0.1) las burbujas no seleccionadas en lugar de eliminarlas.

## Modo público / privado (`3_bi.md` §3.1.1)

Agregar un switch `Pública / Privada` en la UI (esquina superior del mapa):

- **Pública** (default): solo se cargan/renderizan registros con `nivel_acceso = publico` y `nivel_acceso_financiero = publico`. La capa "Cobertura de financiamiento" y los KPIs SROI/HHI/PER quedan ocultos/deshabilitados.
- **Privada**: habilita todas las capas, KPIs y campos financieros (`monto_usd` completo, `donante` desagregado), incluida la capa "Cobertura de financiamiento".

El switch es un control `hx-get` que recarga los fragmentos `kpi_bar.html`, `filtros.html` y `panel_detalle.html` (si hay programa seleccionado) y dispara en `mapa.js` una recarga del endpoint GeoJSON con el parámetro `?version=publico|privado`, sin recargar la página completa. El filtrado por `nivel_acceso`/`nivel_acceso_financiero` ocurre en la vista Django (PostGIS), nunca en el cliente.

## Panel de detalle del programa (Zona 4, `3_bi.md` §3.5)

Al hacer clic sobre una burbuja, `mapa.js` dispara `hx-get` a `/mapa/panel/<programa_id>/`, que renderiza `partials/panel_detalle.html` y lo intercambia (`hx-swap`) en el contenedor de Zona 4. El fragmento contiene 4 pestañas, pobladas 1:1 desde `Programa` + observaciones de `KPI_Observacion` filtradas por `programa_id` (consulta PostGIS, respetando `nivel_acceso`/`nivel_acceso_financiero` según la versión activa):

1. **Identidad**: `nombre`, `estados`, `donante`, `monto_usd` (según `nivel_acceso_financiero`/versión), `tipo_intervencion`.
2. **Indicadores de impacto**: `ha_protegidas`, `ha_manejo_sostenible`, `personas_beneficiadas`, `organizaciones_locales`, `especies_prioritarias`.
3. **KPIs de conservación**: tabla de `KPI_Observacion` (kpi_tipo, valor, unidad, tendencia, `fuente_institucion`, `fuente_url`, `fecha_actualizacion`). En modo privado, agrega filas SROI/HHI/PER si existen para el programa.
4. **Descarga y vínculos**: botón CSV que exporta el registro `Programa` + sus `KPI_Observacion` visibles en la versión activa; enlace a `fuente_url`; botón "compartir enlace" con query params de filtros activos.

## Semáforo de KPI — reglas de color (`5_crtaceptacion.md`)

Mapear `tendencia` de `KPI_Observacion` a color:

- `mejora` → verde `#1a7a4a`
- `estable` → amarillo `#f4c744`
- `deterioro` → rojo `#c0392b`

Tooltip de la capa "Semáforo de KPI" muestra `valor`, `unidad` y `fecha_actualizacion` del registro correspondiente.

## Comportamiento del mapa

### Visualización base
- Centrar en México: lat 23.6345, lng -102.5528, zoom 5.
- Tile base neutro (ej. CartoDB Positron) o sin tiles (fondo `#F9FAFB`).
- Zoom con scroll deshabilitado por defecto; habilitar con Ctrl+scroll.

### Interacción
- Hover sobre burbuja/polígono → tooltip con `nombre` (o nombre de capa) y la métrica principal de la capa activa.
- Clic sobre burbuja → abre panel de detalle (Zona 4) y aplica anillo exterior resaltado.
- Botón × en panel → cierra panel y quita resaltado.

### Leyenda
Control fijo en esquina inferior izquierda con:
- Colores de `tipo_intervencion` (capa burbujas).
- Colores de semáforo (`mejora`/`estable`/`deterioro`) cuando esa capa está activa.
- Conteo: "X de 26 programas visibles" según filtros aplicados.

## Diseño y responsividad

- Mapa 100% del viewport (`height: 100vh`).
- Panel lateral: 320px en desktop, full-width en mobile (< 768px), con transición `transform translateX`.
- Tipografía sistema (`system-ui`, sans-serif).
- Embebible en `<iframe>` sin scrollbar visible.
- Tipografía (Lato para encabezados, Open Sans para cuerpo), paleta institucional FMCN (`#0F6E56`/`#185FA5`/`#a7a337`/`#F9FAFB`/`#111827`/`#6B7280`) y radios de borde (8px tarjetas, 20px pills/badges) siguen `visualbrand.md` y la especificación visual de `Prompt_mapa_publico.md`, que funciona como referencia de identidad visual para Zona 3. Los colores de `tipo_intervencion` (tabla de esta sección) son una codificación semántica independiente de la paleta institucional.

## Consideraciones técnicas

División de responsabilidades entre la capa Leaflet (cliente) y las vistas Django/HTMX (servidor + PostGIS):

**`static/mapa/js/mapa.js`** (solo Leaflet — mapa, marcadores, polígonos, popups):
- `initMap()` → inicializar Leaflet, centrar en México
- `loadLayer(endpoint)` → fetch del endpoint GeoJSON de Django y agregar capa al mapa
- `renderBubbles(geojson)` → capa de burbujas de programa (`CircleMarker`, color por `tipo_intervencion`)
- `renderANPLayer()`, `renderHidrografiaLayer()`, `renderUsoSueloLayer()` → capas GeoJSON opcionales
- `renderSemaforoKPI(geojson)` → recolorea bordes según `tendencia`
- `renderCoberturaFinanciamiento(geojson)` → coropleta por estado (solo versión privada)
- `onMarkerClick(programaId)` → dispara `hx-get` al endpoint del panel (Zona 4)
- `renderLegend()` → control de leyenda Leaflet

**Vistas Django (`views.py`)** — lógica de negocio, permisos y consultas PostGIS:
- `MapaIndexView` → renderiza `index.html` (página completa, Z-1 a Z-4 vacíos)
- `KpiBarFragmentView` → `partials/kpi_bar.html` (Z-1), agregaciones PostGIS sobre `Programa` filtrado
- `FiltrosFragmentView` → `partials/filtros.html` (Z-2), opciones de filtro (incluye KPIs según versión)
- `ProgramasGeoJSONView` → GeoJSON de burbujas, aplicando filtros de Zona 2 y `nivel_acceso*` según versión
- `SemaforoGeoJSONView(kpi_tipo)` → GeoJSON con `tendencia` por `geo_nivel` desde `KPIObservacion`
- `CoberturaFinanciamientoView` → coropleta por estado, **solo accesible en versión privada** (verificar permiso en la vista, no solo ocultar en UI)
- `PanelDetalleFragmentView(programa_id)` → `partials/panel_detalle.html` (Z-4), 4 pestañas
- `DescargaCSVView(programa_id)` → CSV de `Programa` + `KPIObservacion` visibles según versión

## Datos de prueba

Generar `programas.json` con los **26 programas** de la cartera FMCN 2025 (`Dataimpacto.md`) y `programa_id` con el patrón `<CLAVE>_<NNN>`. Ejemplos mínimos a incluir (completar el resto siguiendo el mismo esquema y los valores de `Dataimpacto.md`; usar `0` donde el dato sea "N/D"):

```json
[
  {
    "programa_id": "FANP_001", "nombre": "FANP — Fondo para ANP", "tipo_intervencion": "anp",
    "estados": ["Nacional"], "anp_relacionadas": [], "cuencas_rha": [],
    "donante": "Patrimonial FMCN", "monto_usd": null, "nivel_acceso_financiero": "privado",
    "ha_protegidas": 53477130, "ha_manejo_sostenible": 0, "personas_beneficiadas": 0,
    "organizaciones_locales": 0, "especies_prioritarias": 425,
    "year_inicio": 1996, "year_fin": null, "centroide_lat": 23.6345, "centroide_lng": -102.5528,
    "geojson_url": null, "fuente_url": "https://fmcn.org/seguimiento/"
  },
  {
    "programa_id": "RIOS_001", "nombre": "RÍOS", "tipo_intervencion": "cuenca",
    "estados": ["Jalisco", "Veracruz"], "anp_relacionadas": [], "cuencas_rha": ["RH12Ab", "RH28C"],
    "donante": "GCF", "monto_usd": 9000000, "nivel_acceso_financiero": "publico",
    "ha_protegidas": 0, "ha_manejo_sostenible": 5885, "personas_beneficiadas": 3577,
    "organizaciones_locales": 12, "especies_prioritarias": 0,
    "year_inicio": 2020, "year_fin": null, "centroide_lat": 20.6, "centroide_lng": -104.0,
    "geojson_url": null, "fuente_url": "https://fmcn.org/2026/06/02/informe-anual-2025/"
  },
  {
    "programa_id": "COSMOS_001", "nombre": "CoSMoS", "tipo_intervencion": "anp",
    "estados": ["Centro de México"], "anp_relacionadas": [], "cuencas_rha": [],
    "donante": "KfW", "monto_usd": null, "nivel_acceso_financiero": "privado",
    "ha_protegidas": 1921, "ha_manejo_sostenible": 334, "personas_beneficiadas": 853,
    "organizaciones_locales": 0, "especies_prioritarias": 36,
    "year_inicio": 2018, "year_fin": null, "centroide_lat": 19.8, "centroide_lng": -99.5,
    "geojson_url": null, "fuente_url": "https://fmcn.org/2026/06/02/informe-anual-2025/"
  }
]
```

Generar `kpi_observaciones.json` con al menos una observación por cada ✓ de `4_datastr.md` §4.3 (KPIs públicos: SPI/RLI/TRA/DCI/Carbono/Deforest./Shannon) y, para programas del frente 4/5 (`4_datastr.md` §4.4), observaciones `SROI`/`HHI`/`PER` con `nivel_acceso: "privado"` (§4.5). Distribuir `tendencia` aproximadamente: 50% `mejora`, 30% `estable`, 20% `deterioro`, para poder probar el semáforo.

## Entregable final

Una app Django `mapa/` (modelos GeoDjango sobre PostGIS, templates + fragmentos HTMX, `mapa.js` con Leaflet), con fixtures cargables vía `manage.py loaddata`. Al terminar, levantar con `manage.py runserver` (requiere PostgreSQL con extensión PostGIS) y verificar:
1. La capa de burbujas carga con los 26 programas desde el endpoint GeoJSON.
2. El switch público/privado oculta correctamente capas, montos y KPIs privados (verificado también a nivel de vista/permiso, no solo de UI).
3. Los filtros de Zona 2 actualizan los fragmentos HTMX (Z-1, Z-4) y la capa Leaflet en < 500 ms.
4. El panel de detalle (Zona 4) se carga como fragmento HTMX con las 4 pestañas, con datos reales de `Programa`/`KPIObservacion` en PostGIS.

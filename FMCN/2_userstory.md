## 2. Historia de usuario

### 2.1 Contexto y necesidad

El FMCN administra una cartera de 26 programas que operan en distintos ecosistemas, escalas geográficas y modelos de financiamiento. Los equipos directivos, de areas sustantivas, de comunicación, socios gubernamentales, fondeadores (potenciales y actuales) y el público general necesitan comprender el impacto territorial de manera intuitiva, sin depender de reportes estáticos o bases de datos técnicas de difícil acceso.

El demo del Atlas FMCN (prototipo estático HTML/JS) materializa esta necesidad en **dos piezas**:

1. **Versión pública**: `portada_atlas_fmcn.html` (portada pública) + `mapa_impacto_fmcn.html` (mapa interactivo), accesibles sin autenticación.
2. **Portal privado**: `landing_privado_fmcn.html` (landing con simulación de roles), que da acceso al mismo mapa interactivo, al tablero `dashboard_bi_fmcn.html` (BI e indicadores) y a una sección desplegable de repositorio de datos.

El prototipo modela en detalle **16 de los 26 programas** del portafolio (datos completos: ubicación, hectáreas, financiamiento, KPIs); el resto de las cifras (26 programas, 369 organizaciones, 425 especies, etc.) se presentan como totales agregados de cartera.

### 2.2 Roles de usuario identificados

| Rol (especificación)         | Rol simulado en el demo (portal privado)                  | Necesidad principal                                 | Pregunta clave que responde el mapa                        |
| ---------------------------- | --------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| **Director / Consejo**       | Administrador FMCN (`admin`)                              | Visión consolidada del impacto de la cartera        | _¿Cuántas ha y personas impactamos por región este año?_   |
| **Equipo de programas**      | Equipo técnico de proyecto (`tecnico`)                    | Seguimiento operativo por programa y cuenca         | _¿Qué programas activos hay en la Cuenca Ameca-Mascota?_   |
| **Donante / Cooperante**     | Donante institucional (`donante`)                         | Trazabilidad del impacto de su aportación           | _¿Cuál es el impacto territorial del proyecto financiado?_ |
| **Socio gubernamental**      | _No representado en el selector "Ver como" del demo_      | Complementariedad con programas de CONANP / CONAFOR | _¿Qué ANPs tienen cofinanciamiento FMCN activo?_           |
| **Público general / Medios** | Versión pública (sin sesión)                              | Comprensión rápida del alcance de la conservación   | _¿Dónde trabaja el FMCN y qué conserva?_                   |
| **Analista de datos**        | Cubierto por `admin` / `tecnico` vía Repositorio de datos | Acceso a datos desagregados para análisis externo   | _¿Puedo descargar los datos del SPI por programa?_         |

> Nota: el selector "Ver como:" del portal privado (`landing_privado_fmcn.html`) solo simula 3 roles (`admin`, `tecnico`). El rol **Socio gubernamental** y el rol independiente **Analista de datos** no tienen una vista propia en el demo — ver brechas en §2.7.

### 2.3 Historia de usuario principal

> **Como** miembro del equipo directivo del FMCN, **quiero** explorar visualmente el impacto territorial de los programas de conservación financiados sobre un mapa interactivo de México, **para poder** comunicar el alcance de nuestra misión, identificar brechas de cobertura y validar el cumplimiento de metas por programa y cuenca, sin necesidad de consultar múltiples reportes o sistemas separados.

### 2.4 Piezas del demo

| Pieza           | Pantalla                    | Archivo                                                 | Acceso                                    |
| --------------- | --------------------------- | ------------------------------------------------------- | ----------------------------------------- |
| Versión pública | Portada pública             | `portada_atlas_fmcn.html`                               | Sin sesión                                |
| Versión pública | Mapa interactivo            | `mapa_impacto_fmcn.html`                                | Sin sesión                                |
| Portal privado  | Landing privado             | `landing_privado_fmcn.html`                             | Simulación de rol (`admin` / `tecnico` )  |
| Portal privado  | Mapa interactivo "avanzado" | `mapa_impacto_fmcn.html` (mismo archivo)                | Vía landing privado                       |
| Portal privado  | BI & Indicadores            | `dashboard_bi_fmcn.html`                                | Vía landing privado                       |
| Portal privado  | Repositorio de datos        | Panel desplegable dentro de `landing_privado_fmcn.html` | Vía landing privado, condicionado por rol |

### 2.5 Casos de uso implementados — Versión pública

#### 2.5.1 Portada pública (`portada_atlas_fmcn.html`)

- **Como** visitante público, **quiero** ver cifras globales del portafolio al entrar al sitio, **para** entender de inmediato el alcance del FMCN sin leer reportes. _Implementado: sección "Cifras globales" (`.cifras-grid`)._
- **Como** visitante, **quiero** ver las 5 líneas de intervención del portafolio (ANP federales, cuencas hidrográficas, costero-marino, paisaje productivo, especie/fondo patrimonial) con su color, conteo de programas y descripción, **para** identificar qué tipo de proyectos conserva el FMCN — usando los mismos colores que el mapa. _Implementado: sección "Cinco formas de intervenir en el territorio" (`#tipos-grid`)._
- **Como** visitante, **quiero** ver tarjetas de programas destacados (MEx30x30, FANP, Fondo Mariposa Monarca, Fondo Golfo de California) con su cifra principal y descripción, **para** conocer ejemplos emblemáticos antes de explorar el mapa completo. _Implementado: sección "Programas destacados" (`#programas-grid`), cada tarjeta enlaza al mapa interactivo._
- **Como** visitante, **quiero** un mini-mapa estático en el hero que muestre la distribución geográfica de los programas y funcione como llamada a la acción hacia el mapa interactivo, **para** pasar de la portada a la exploración con un clic. _Implementado: `#minimapa` (Leaflet no interactivo) + overlay "Ver los 17 programas en el mapa →"._
- **Como** visitante, **quiero** cambiar el idioma entre español e inglés desde cualquier sección, **para** acceder al contenido en mi idioma preferido. _Implementado: `lang-toggle` ES/EN, traduce hero, cifras, tipos, programas y cierre._
- **Como** visitante, **quiero** enlaces directos a `fmcn.org` y al mapa interactivo desde el header, el hero y el cierre, **para** profundizar o pasar a la siguiente pieza del atlas. _Implementado._

#### 2.5.2 Mapa interactivo — vista pública (`mapa_impacto_fmcn.html`)

- **Como** visitante, **quiero** ver los 16 programas modelados como burbujas sobre un mapa de México, con tamaño proporcional a sus hectáreas y color según tipo de intervención, **para** identificar visualmente dónde y cómo trabaja el FMCN. _Implementado: marcadores Leaflet, función `radioPorHa` con 4 tamaños discretos._
- **Como** visitante, **quiero** filtrar los programas visibles por tipo de intervención (ANP, cuenca, costero, paisaje, especie) mediante pills en el header, **para** enfocarme en mi área de interés. _Implementado (Épica 1): `#filtros`, atenúa/resalta marcadores según `tipo_intervencion`._
- **Como** visitante, **quiero** ver al pasar el cursor un tooltip con el nombre del programa y su cifra principal (hectáreas o personas beneficiadas), **para** tener contexto inmediato sin hacer clic. _Implementado: `.fmcn-tooltip`._
- **Como** visitante, **quiero** hacer clic sobre un programa y obtener un panel lateral con su nombre, tipo, estados, descripción, KPIs (hectáreas, personas, organizaciones, especies), financiamiento y una gráfica que compara sus hectáreas contra el promedio del portafolio (escala logarítmica), **para** entender su impacto sin salir del mapa. _Implementado (Épica 1 + parte de Épica 2): panel lateral + `Chart.js` (`renderChart`)._
- **Como** visitante, **quiero** activar/desactivar una capa de "Regiones" biogeográficas sobre el mapa base, **para** entender la distribución territorial por gran región del país. _Implementado: control `CtrlRegiones`, 6 regiones con polígonos y etiquetas._
- **Como** visitante, **quiero** ver una barra de estadísticas globales fija en la parte inferior (53.5M ha, 26 proyectos, 3,189 donativos, 125,661 personas, 232 ANP), **para** tener el resumen de cartera siempre visible mientras exploro. _Implementado (Épica 2 — "panel de resumen con totales consolidados"): footer `#stats`._
- **Como** visitante, **quiero** cambiar el idioma ES/EN y que se actualicen tooltips, panel lateral, filtros, capa de regiones y estadísticas, **para** consultar el mapa en mi idioma preferido. _Implementado._

### 2.6 Casos de uso implementados — Portal privado

#### 2.6.1 Landing privado (`landing_privado_fmcn.html`)

- **Como** usuario autenticado, **quiero** un selector "Ver como:" que simule mi rol (Administrador FMCN / Equipo técnico de proyecto) y ajuste qué accesos están disponibles, **para** validar el modelo de permisos por rol antes de construir el backend real. _Implementado: `#selector-rol`, tabla `ROLES` con `acceso`, `alcances` y `notas` por rol._
- **Como** usuario autenticado, **quiero** un saludo personalizado y 6 KPIs globales de cartera (ha protegidas, ha manejo sostenible, personas con prácticas sostenibles, especies prioritarias, organizaciones locales, programas activos) al entrar al portal, **para** tener contexto inmediato. _Implementado: hero + `.kpis`. Nota: estos 6 KPIs no varían según el rol seleccionado._
- **Como** usuario autenticado, **quiero** 3 accesos principales — Mapa interactivo avanzado, BI & Indicadores, Repositorio de datos — cada uno con un texto de "alcance" que cambia según mi rol (p. ej. "Acceso completo, todas las capas" vs. "Solo capas/proyectos asociados a su financiamiento"), **para** entender qué parte de la información me corresponde. _Implementado: `.card`, `#alcance-mapa`, `#alcance-bi`, `#alcance-repo`._
- **Como** usuario cuyo rol no tiene acceso a un módulo, **quiero** ver la tarjeta o tile correspondiente atenuada, con un candado y un tooltip "No disponible para tu rol", y que su botón quede deshabilitado, **para** entender visualmente las restricciones sin necesidad de hacer clic. _Implementado: clase `.deshabilitado`, `.candado`, `aria-disabled`._
- **Como** usuario autenticado, **quiero** 5 accesos secundarios visibles desde el landing — Mis proyectos, Alertas territoriales, Matriz de priorización, Generar reporte, Administración — cada uno habilitado/deshabilitado según mi rol, **para** anticipar el resto de módulos del sistema. _Implementado como UI (`.tiles-grid`); ver brecha de funcionalidad en §2.7._
- **Como** usuario autenticado, **quiero** cerrar sesión y cambiar idioma ES/EN desde el header, **para** controlar mi sesión y el idioma de la interfaz. _Implementado (`#btn-logout` solo registra en consola)._

#### 2.6.2 Mapa interactivo — vista privada

- El acceso "Abrir mapa →" de la tarjeta "Mapa interactivo avanzado" del landing privado apunta al **mismo archivo** `mapa_impacto_fmcn.html` que la versión pública. El demo **no** diferencia capas privadas (cobertura de financiamiento, KPIs de eficiencia) ni exportación a PNG/PDF, ambas descritas en el texto `mapa_desc` del landing. Ver brecha en §2.7.

#### 2.6.3 BI & indicadores (`dashboard_bi_fmcn.html`)

- **Como** Administrador / Equipo técnico, **quiero** ver KPIs públicos de cartera (ha financiadas, ha con manejo sostenible, personas con prácticas sostenibles, especies prioritarias, organizaciones locales, programas activos) y KPIs privados marcados con badge "Privado" (donativos gestionados, SROI, HHI, PER), **para** tener una vista ejecutiva de desempeño y eficiencia fiduciaria de la cartera. _Implementado: Zona 1, `kpis-pub` / `kpis-priv`. El badge "Vista: Privada" indica que esta pantalla siempre se considera privada._
- **Como** analista, **quiero** filtrar la cartera por tipo de intervención (pills de selección múltiple) y por donante/mecanismo (GCF, GEF, KfW, Patrimonial FMCN, Otros), y limpiar todos los filtros con un botón, **para** acotar el análisis al subconjunto que me interesa. _Implementado: Zona 2, `#pills-tipo`, `#filtro-donante`, `#btn-limpiar`._
- **Como** analista, **quiero** que al aplicar filtros los KPIs públicos recalculen una suma aproximada del subconjunto filtrado, con una nota aclaratoria de que es ilustrativa, **para** tener una cifra de referencia rápida sin confundirla con el dato oficial agregado. _Implementado: `renderKpisPub`, `#nota-filtro`._
- **Como** analista, **quiero** 4 gráficas dinámicas — hectáreas por programa (top 10), programas por donante/mecanismo (dona), programas por tipo de intervención (barras) y cumplimiento de indicadores por programa coloreado según semáforo —, **para** identificar patrones de concentración y desempeño de un vistazo. _Implementado: Zona 3, `Chart.js` (`charts.ha`, `charts.donante`, `charts.tipo`, `charts.cumpl`)._
- **Como** analista, **quiero** una tabla con los 16 programas (programa, tipo, donante/mecanismo, monto USD, ha, personas, organizaciones, especies, semáforo, % de cumplimiento), ordenable por nombre, hectáreas y cumplimiento, **para** revisar la cartera en detalle. _Implementado: Zona 4, `renderTabla`, columnas `ordenable`._
- **Como** analista, **quiero** expandir la "ficha" de un programa para ver avance financiero (presupuesto vs. ejercido), barra y porcentaje de cumplimiento de indicadores, semáforo de riesgo en grande, próximo hito clave y documentos adjuntos descargables, además de un enlace para ver los KPIs de conservación de ese programa en el mapa, **para** profundizar sin salir del tablero. _Implementado: `filaFicha`, fila expandible por programa (una a la vez)._
- **Como** analista, **quiero** exportar la cartera completa a CSV o PDF desde el footer del tablero, **para** usarla en reportes externos. _Botón presente (`#btn-csv`, `#btn-pdf`) pero **no funcional** — solo `console.log`; ver brecha en §2.7._

#### 2.6.4 Repositorio de datos (panel desplegable del landing privado)

- **Como** Administrador / Equipo técnico, **quiero** ver dos grupos de archivos descargables — "Shapefiles y capas GIS" (ANP federales, red hidrográfica INEGI, uso de suelo INEGI, cobertura de financiamiento por entidad) y "Datos de monitoreo y cartera" (`programas.json`, `kpi_observaciones.json`, `cartera-fmcn-2025.csv`) —, cada uno con su peso en MB/KB y un botón de descarga, **para** obtener datos desagregados para análisis externo (Épica 4). _Implementado: `.repo-grupo`, `.repo-fila`, `.btn-descargar`. Los botones solo registran en consola (`console.log`), no generan una descarga real — ver brecha en §2.7._
- **Como** Donante institucional, en cambio, al expandir esta sección veo el mensaje de no disponibilidad descrito en §2.6.1 (cubierto por `repo-panel.solo-mensaje`).

### 2.7 Casos de uso pendientes — brechas del demo respecto a la especificación

> Estas brechas se reportan únicamente como referencia para roadmap/backlog. No se realizaron cambios al HTML/JS del demo, salvo el ítem 14 (corrección de copy ya aplicada).

| # | Caso de uso pendiente | Épica / origen | Estado en el demo |
| --- | --- | --- | --- |
| 1 | Capa de ANP federales superpuesta al mapa para validar coincidencia espacial entre programas FMCN y áreas protegidas oficiales | Épica 1 — Exploración geográfica | No implementado. El único toggle de capa adicional es "Regiones" biogeográficas (`CtrlRegiones`), no una capa de ANP federales. |
| 2 | KPIs de indicadores de conservación por programa (SPI, RLI, DCI, Carbono, Deforestación, Shannon-Wiener) con fuente oficial y fecha de actualización | Épica 2 — Inteligencia de indicadores | No implementado. El panel del mapa solo expone ha / personas / organizaciones / especies; el dashboard BI usa `cumplimiento_pct` y `semaforo` genéricos marcados como "ilustrativo" (`// ilustrativo`), sin desglosar por estos 6 indicadores ni citar fuente/fecha. |
| 3 | Semáforo (verde/amarillo/rojo) que compare el estado de conservación de zonas con y sin financiamiento FMCN | Épica 2 — Inteligencia de indicadores | No implementado. El semáforo del dashboard BI es por programa (riesgo/cumplimiento interno), no una comparación territorial con/sin financiamiento FMCN. |
| 4 | Control de línea de tiempo (slider de año 2015-2025) para ver evolución histórica del impacto territorial | Épica 3 — Gestión temporal | No implementado en ninguna de las 4 pantallas. |
| 5 | Comparar dos periodos seleccionados para medir el cambio en hectáreas protegidas y KPIs de conservación | Épica 3 — Gestión temporal | No implementado (depende del punto 4). |
| 6 | Descargar los datos del programa seleccionado en CSV o PDF desde el panel del mapa | Épica 4 — Exportación y transparencia | No implementado. El botón "Ver ficha completa →" del panel lateral solo hace `console.log("abrir ficha: " + p.id)`, sin generar archivo ni navegar. |
| 7 | Exportar la cartera completa a CSV/PDF desde el dashboard BI | Épica 4 — Exportación y transparencia | Botones presentes (`#btn-csv`, `#btn-pdf`) pero no funcionales — solo `console.log`. |
| 8 | Descarga real de archivos del repositorio de datos (shapefiles, GeoJSON, JSON, CSV) | Épica 4 — Exportación y transparencia | Botones presentes (`.btn-descargar`) pero no funcionales — solo `console.log`, sin archivo real ni endpoint. |
| 9 | Acceso directo, por KPI, a las fuentes de datos oficiales que lo validan (CONANP, CONAFOR, CONABIO, INEGI) | Épica 4 — Exportación y transparencia | Parcial. El repositorio lista archivos con una fuente general en su descripción (p. ej. "SIG CONANP", "INEGI"), pero ni la ficha del programa en el mapa ni la ficha del dashboard BI incluyen enlaces de fuente por KPI individual. |
| 10 | Mapa "avanzado" con capas privadas (cobertura de financiamiento, KPIs de eficiencia) y exportación a PNG/PDF, tal como se describe en la tarjeta del landing privado | Surge del landing privado (`mapa_desc`) | No implementado. "Abrir mapa →" enlaza al mismo `mapa_impacto_fmcn.html` público, sin diferenciación de capas por rol ni exportación PNG/PDF. |
| 11 | Pantallas funcionales para los 5 accesos secundarios del landing privado: Mis proyectos, Alertas territoriales, Matriz de priorización, Generar reporte, Administración | Surge del landing privado | Solo UI. Los tiles se habilitan/deshabilitan según el rol simulado, pero el botón "Abrir" únicamente hace `console.log`; no existe pantalla destino para ninguno. |
| 12 | Rol "Socio gubernamental" (CONANP/CONAFOR) como vista propia | §2.2 Roles | No representado en el selector "Ver como:" del portal privado (solo `admin` / `tecnico` / `donante`). |
| 13 | Rol "Analista de datos" como rol independiente con su propia vista | §2.2 Roles | Cubierto parcialmente por `admin`/`tecnico` a través del Repositorio de datos, pero no existe como rol seleccionable propio. |
| 14 | ✅ **Resuelto** — Inconsistencia de copy: el hero de la portada pública dice "Ver los 17 programas en el mapa →", pero el mapa interactivo modela 16 programas (`programas.length === 16`) | Observación de contenido | Corregido en `portada_atlas_fmcn.html`: el hero (fallback ES y claves `hero_mapa_cta` ES/EN) ahora dice "Ver los 16 programas en el mapa →" / "See all 16 programs on the map →", alineado con `programas.length === 16`. |

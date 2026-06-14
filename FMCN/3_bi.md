## 3. Descripción del tablero de datos

### 3.1 Arquitectura general del dashboard

El tablero se organiza en cuatro zonas funcionales que operan de forma simultánea e interconectada:

|Zona|Nombre|Función|Componente UI|
|---|---|---|---|
|**Z-1**|Barra de KPIs globales|Indicadores de cartera completa en tiempo real|Tarjetas métricas en fila superior|
|**Z-2**|Panel de control y filtros|Filtros por tipo, KPI, estado, donante y año|Barra lateral izquierda colapsable|
|**Z-3**|Mapa central interactivo|Visualización territorial de programas y KPIs|Mapa vectorial con capas superpuestas|
|**Z-4**|Panel de detalle del programa|Información completa al seleccionar un programa|Panel lateral derecho deslizable|

#### 3.1.1 Versiones del tablero: pública y privada

El tablero se especializa en dos versiones que comparten la misma arquitectura de zonas (Z-1 a Z-4), pero difieren en las fuentes de datos habilitadas y el nivel de detalle expuesto. La clasificación se basa en `Fuentedatos.md` (§4.4-4.5):

|Versión|Audiencia|Fuentes de datos|Alcance adicional|
|---|---|---|---|
|**Pública**|Donantes, socios gubernamentales, público general, medios|Datos abiertos gubernamentales (CONANP, CONAFOR, CONABIO, INEGI, CONAGUA, SEMARNAT) + información publicada por FMCN (Informe Anual 2025)|KPIs de conservación (SPI, RLI, TRA, DCI, Carbono, Deforestación, Shannon-Wiener), totales de cartera, ubicación y descripción de programas|
|**Privada**|Director/Consejo, equipo de programas, analistas internos|Todo lo de la versión pública + sistemas internos FMCN (LOVIS/SISEP, encuestas socioeconómicas FONCET/FGM/FONNOR)|Montos por donativo (3,189), KPIs de eficiencia fiduciaria e impacto social (SROI, HHI, Ratio de Eficiencia de Programas), desagregación financiera por donante y programa|

Cada capa, KPI, filtro o campo de exportación que dependa de datos no públicos se marca como **Privado** en las secciones siguientes; el resto está disponible en ambas versiones.

### 3.2 Zona 1 — Barra de KPIs globales de cartera

La barra superior del dashboard muestra siempre los totales consolidados de la cartera FMCN 2025. Se actualiza automáticamente al aplicar filtros para reflejar el subconjunto seleccionado.

|Indicador|Valor de referencia 2025|Unidad|Actualización|
|---|---|---|---|
|Ha financiadas (protección)|**53,477,130**|Hectáreas|_Anual (INFyS / CONAFOR)_|
|Ha con manejo sostenible|**1,204,667**|Hectáreas|_Anual (INFyS / CONAFOR)_|
|Personas con prácticas sostenibles|**125,661**|Personas|_Anual (reportes de programa)_|
|Especies prioritarias atendidas|**425**|Especies|_Anual (NOM-059 / CONABIO)_|
|Organizaciones locales financiadas|**369**|Organizaciones|_Anual (reportes de programa)_|
|Programas activos|**26**|Programas|_Continua_|

Todos los indicadores de Z-1 provienen del Informe Anual FMCN 2025 (información pública) y están disponibles en ambas versiones del tablero.

### 3.3 Zona 2 — Panel de control y filtros

El panel lateral izquierdo permite al usuario segmentar la vista del mapa de manera acumulativa. Todos los filtros operan en modo AND (intersección), con opción de limpiar la selección completa.

**Filtros disponibles:**

- **Tipo de intervención:** ANP federales, cuencas hidrográficas, costero-marino, paisaje productivo, especie / fondo patrimonial.
- **Estado / región:** selector múltiple de entidades federativas.
- **KPI de conservación:** SPI, RLI, TRA, DCI, carbono, deforestación, Shannon-Wiener (disponibles en ambas versiones). _Privado:_ se añaden SROI, HHI y Ratio de Eficiencia de Programas (§4.5).
- **Donante / fondo:** GCF, GEF, KfW, fondos patrimoniales FMCN, cooperación bilateral.
- **Periodo:** slider temporal 2015-2025, con opción de comparar dos años.
- **Escala de burbuja:** configurable entre hectáreas, personas o inversión financiera. La opción de inversión financiera muestra `monto_usd` solo donde `nivel_acceso_financiero = publico` (ej. ACCIÓN-GCF, RÍOS-GCF); en la versión privada se habilita para todos los programas vía LOVIS/SISEP.

### 3.4 Zona 3 — Mapa central interactivo

El mapa es el componente central del tablero. Utiliza cartografía vectorial oficial de México con las siguientes capas superponibles:

Todas las capas se alinean con los datasets relevantes de `Fuentedatos.md` (§4.4) y la información de actividades FMCN (`Dataimpacto.md`); no se incluyen capas sin respaldo en alguna de estas dos fuentes.

|Capa|Descripción|Fuente oficial|Visibilidad|Toggle|
|---|---|---|---|---|
|**Burbujas de programa**|Círculo proporcional a ha financiadas, color por tipo de ecosistema|Cartera FMCN 2025 (Informe Anual)|Público|**Activo por defecto**|
|**ANP federales**|Polígonos oficiales de las 232 ANP federales|SIG CONANP|Público|Opcional|
|**Red hidrológica**|Cuencas y ríos principales de México 1:50,000|INEGI Hidrografía|Público|Opcional|
|**Uso de suelo**|Serie VI de uso de suelo y vegetación INEGI, escala 1:250,000|INEGI Uso de suelo|Público|Opcional|
|**Semáforo de KPI**|Color por estado de conservación del KPI seleccionado (SPI, RLI, TRA, DCI, Carbono, Deforestación, Shannon-Wiener) por programa, ANP o cuenca|CONANP / CONAFOR / CONABIO / INEGI / CONAGUA / SEMARNAT|Público|Opcional|
|**Cobertura de financiamiento**|Coropleta de donativos e inversión por entidad federativa, agregada desde el sistema interno de gestión de fondos|LOVIS / SISEP (interno FMCN)|Privado|Opcional (solo versión privada)|

### 3.5 Zona 4 — Panel de detalle del programa

Al seleccionar un programa en el mapa, se despliega un panel lateral derecho con la información completa del programa organizada en cuatro pestañas:

**Pestaña 1 — Identidad del programa:**

- Nombre, descripción corta, estado/región de operación.
- Donante(s), mecanismo financiero y monto si está disponible. _Monto exacto: público solo si `nivel_acceso_financiero = publico` (ej. ACCIÓN-GCF, RÍOS-GCF); en la versión privada se muestra para todos los programas._
- Tipo de ecosistema intervenido y nivel de escala (local, regional, nacional).

**Pestaña 2 — Indicadores de impacto:**

- Hectáreas financiadas para protección y manejo sostenible.
- Número de personas con prácticas sostenibles adoptadas.
- Organizaciones locales financiadas y número de donativos _(desglose por programa: solo versión privada; total de cartera —3,189— es público)_.
- Especies prioritarias atendidas (si aplica).

**Pestaña 3 — KPIs de conservación:**

- Tabla de KPIs aplicables al programa con valor actual, tendencia (↑/↓/=) y fuente.
- Enlace directo a la fuente de datos oficial para validación.
- Indicador de fecha de última actualización del KPI.
- _Privado:_ filas adicionales con SROI, HHI y Ratio de Eficiencia de Programas cuando el programa aplique (§4.5).

**Pestaña 4 — Descarga y vínculos:**

- Botón de descarga de datos del programa en CSV. _Pública:_ campos con `nivel_acceso = publico` / `nivel_acceso_financiero = publico`. _Privada:_ conjunto completo, incluidos datos LOVIS/SISEP.
- Enlace al sitio web del programa o nota técnica si existe.
- Compartir enlace permanente con la selección actual del mapa.

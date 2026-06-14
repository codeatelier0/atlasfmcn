# 4. Propuesta de estructura de datos

### 4.1 Modelo de datos del mapa (entidades principales)

#### Entidad: `Programa`

|Campo|Tipo|Descripción|Ejemplo|
|---|---|---|---|
|`programa_id`|String (PK)|Identificador único del programa|`FANP_001`|
|`nombre`|String|Nombre oficial del programa|`FANP — Fondo para ANP`|
|`tipo_intervencion`|Enum|`anp` / `cuenca` / `costero` / `paisaje` / `especie`|`anp`|
|`estados`|Array[String]|Entidades federativas de operación|`[Chiapas, Jalisco]`|
|`anp_relacionadas`|Array[String]|Claves CONANP de ANP vinculadas|`[ANP-MX-0001]`|
|`cuencas_rha`|Array[String]|Claves RHA de cuencas involucradas|`[RH12Ab]`|
|`donante`|String|Donante o fondo principal|`GCF, KfW, Patrimonial`|
|`monto_usd`|Float (nullable)|Inversión en USD si es público|`25000000`|
|`nivel_acceso_financiero`|Enum|Visibilidad de `monto_usd` y `donante`: `publico` (dato publicado, ej. ACCIÓN-GCF, RÍOS-GCF, MEx30x30-GEF, C6-GEF, Mariposa Monarca-patrimonial, ver `datafunding.md`) / `privado` (solo disponible vía LOVIS/SISEP)|`privado`|
|`ha_protegidas`|Float|Hectáreas financiadas para protección|`53477130`|
|`ha_manejo_sostenible`|Float|Hectáreas con manejo sostenible|`1204667`|
|`personas_beneficiadas`|Integer|Personas con prácticas adoptadas|`3577`|
|`organizaciones_locales`|Integer|Organizaciones locales financiadas|`52`|
|`especies_prioritarias`|Integer|Especies prioritarias atendidas|`36`|
|`year_inicio`|Integer|Año de inicio del programa|`2018`|
|`year_fin`|Integer (nullable)|Año de término o null si activo|`null`|
|`centroide_lat`|Float|Latitud del centroide del programa|`19.4326`|
|`centroide_lng`|Float|Longitud del centroide del programa|`-99.1332`|
|`geojson_url`|URL (nullable)|Polígono o multipolígono del área|`https://...`|
|`fuente_url`|URL|URL del sitio web o nota técnica|`https://fmcn.org/...`|

#### Entidad: `KPI_Observacion`

Cada observación registra el valor de un KPI de conservación en un momento dado, vinculada a un programa o a una unidad geográfica (municipio, cuenca, ANP).

|Campo|Tipo|Descripción|Ejemplo|
|---|---|---|---|
|`kpi_obs_id`|String (PK)|ID único de la observación|`KPI-SPI-2025-FANP-001`|
|`programa_id`|String (FK)|Referencia al programa|`FANP_001`|
|`kpi_tipo`|Enum|`SPI` / `RLI` / `TRA` / `DCI` / `Carbono` / `Deforest.` / `Shannon` / `SROI` / `HHI` / `PER`|`SPI`|
|`valor`|Float|Valor numérico del KPI|`0.82`|
|`unidad`|String|Unidad de medida del KPI|`índice 0-1`|
|`tendencia`|Enum|`mejora` / `estable` / `deterioro`|`mejora`|
|`año`|Integer|Año de la observación|`2024`|
|`fuente_institucion`|String|Institución que genera el dato|`CONANP`|
|`fuente_url`|URL|URL directa al dataset|`https://sig.conanp.gob.mx/`|
|`fecha_actualizacion`|Date|Última actualización del registro|`2025-01-15`|
|`geo_nivel`|Enum|`programa` / `anp` / `cuenca` / `municipio`|`anp`|
|`geo_clave`|String|Clave de la unidad geográfica|`ANP-MX-0001`|
|`nivel_acceso`|Enum|Visibilidad de la observación: `publico` (datos abiertos gubernamentales) / `privado` (sistemas internos FMCN)|`publico`|

### 4.2 KPIs de conservación: definición y fuentes de datos

|KPI|Definición|Cálculo / Método|Fuente de datos|Frecuencia|Visibilidad|
|---|---|---|---|---|---|
|**SPI** — Especies protegidas|Proporción del hábitat de cada especie prioritaria cubierto por áreas protegidas|`Σ(ha ANP ∩ hábitat especie) / ha hábitat total`, promediado para todas las especies|CONANP SIG + CONABIO Geoportal|Anual|Público|
|**RLI** — Lista Roja|Índice de tendencia del riesgo de extinción de especies endémicas monitoreadas|Variación en categorías NOM-059 entre periodos; 1 = sin pérdida, 0 = extinción total|SEMARNAT NOM-059 + CONABIO SNIB|Cada 3-5 años|Público|
|**TRA** — Reducción de amenazas|Magnitud de reducción de amenazas directas (incendios, tala ilegal, cacería furtiva) en el área de intervención respecto a la línea base|Evaluación de cambio en intensidad/alcance/severidad de amenazas pre/post intervención (metodología FOS/CMP), aplicada a brigadas y planes operativos FANP/CoSMoS|SIMEC CONANP (reportes FANP / CoSMoS)|Anual|Público|
|**DCI** — Conectividad fluvial|Capacidad de migración de fauna acuática no fragmentada por presas|`DCI = (Σ segmentos libres)² / (Σ segmentos totales)²` por cuenca RHA|INEGI Hidrografía + CONAGUA SINA|Bienal|Público|
|**Carbono** — Almacén/flujo|Toneladas de carbono almacenadas en biomasa forestal en áreas de intervención|Modelo alométrico INFyS × densidad de rodales; validado por MRV CONAFOR|SNMF CONAFOR (INFyS + MRV)|Quinquenal|Público|
|**Deforestación** — Tasa de pérdida|Tasa anual de pérdida neta de cobertura forestal en el área de intervención|`Δ(ha forestales t1 − t0) / ha forestales t0 × 100` por cuadrante 250 m|INEGI Uso de suelo Serie VI + INFyS|Bienal|Público|
|**Shannon-Wiener** — Diversidad|Índice H' de diversidad de especies en transectos de monitoreo dentro de ANP|`H' = −Σ(pᵢ × ln pᵢ)` donde pᵢ = proporción de individuos de la especie i|SIMEC CONANP (monitoreo.php)|Anual|Público|

### 4.3 Programas por KPI aplicable

|Programa|SPI|RLI|TRA|DCI|Carbono|Deforest.|Shannon|
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|FANP / MEx30x30|✓|✓|✓|—|—|—|✓|
|ACCIÓN|✓|—|—|—|—|—|✓|
|RÍOS|—|—|—|✓|✓|—|—|
|CONECTA|—|—|—|✓|✓|✓|—|
|ORIGEN|—|—|—|✓|✓|✓|—|
|CoSMoS|✓|✓|✓|—|—|—|✓|
|Sierra y Mar|✓|—|—|—|✓|✓|—|
|Cuencas y Ciudades|—|—|—|✓|✓|—|—|
|C6 / Costeras|✓|—|—|—|—|—|✓|
|FOMAFUR|✓|—|—|—|✓|✓|—|
|Mariposa Monarca|—|✓|—|—|—|✓|✓|
|Cuenca de Los Ojos|—|✓|—|—|✓|✓|—|
|Fondo Golfo de Cal.|✓|✓|—|—|—|—|✓|
|C-SAM|✓|—|—|—|—|—|✓|
|Conserva Aves|✓|✓|—|—|—|—|✓|

### 4.4 Fuentes de datos por frente estratégico (Fuentedatos)

Mapeo directo de los cinco frentes diagnosticados en `Fuentedatos.md`, fuente de verdad para validar qué datasets respaldan cada KPI y a qué versión del tablero (§3.1.1) corresponden.

|Frente|Proyectos aplicables|KPI(s) asociado(s)|Datasets relevantes|Visibilidad|
|---|---|---|---|---|
|1. Protección de ANP y especies prioritarias|FANP, MEx30x30, Sierra y Mar, Fondo Mariposa Monarca, Conserva Aves|SPI, RLI, TRA|SIG y SIMEC de la CONANP; SNIB de la CONABIO; NOM-059-SEMARNAT-2010|Público|
|2. Manejo sostenible y paisajes productivos|CONECTA, Fondo Jorge de Alba|Deforestación (NDVI), Carbono|Cartografía de Uso del Suelo y Vegetación INEGI (1:250,000); INFyS y MRV de la CONAFOR|Público|
|3. Cuencas hidrográficas y resiliencia costero-marina|RÍOS, ORIGEN, Cuencas y Ciudades, ACCIÓN, C6, Fondo para el Golfo de California, C-SAM|DCI|Red Hidrográfica Digital del INEGI; SINA de la CONAGUA|Público|
|4. Impacto social y equidad comunitaria|Cartera nacional (125,661 personas, 369 organizaciones, inclusión indígena)|SROI|Encuestas socioeconómicas de FMCN y sub-ejecutores (FONCET, FGM, FONNOR) — no centralizadas por gobierno|Privado|
|5. Eficiencia fiduciaria y resiliencia organizacional|Gestión institucional FMCN y fondos regionales|HHI, Ratio de Eficiencia de Programas|Reportes financieros auditados y sistemas internos de gestión de fondos (LOVIS / SISEP)|Privado|

### 4.5 KPIs de gestión interna (solo tablero privado)

KPIs del frente 4 y 5 de `Fuentedatos.md`. Dependen de datos administrados directamente por FMCN (sin contraparte en datasets gubernamentales abiertos), por lo que solo se exponen en la versión privada del tablero (§3.1.1).

|KPI|Definición|Cálculo / Método|Fuente de datos|Frecuencia|Visibilidad|
|---|---|---|---|---|---|
|**SROI** — Retorno Social de la Inversión|Valor socioeconómico generado por cada USD invertido en capacitación, resiliencia climática y prácticas productivas|`Valor social generado / Inversión total`, metodología SROI estándar|Encuestas socioeconómicas FMCN + sub-ejecutores (FONCET, FGM, FONNOR)|Anual|Privado|
|**HHI** — Diversificación de ingresos|Concentración de la cartera de financiamiento por donante/mecanismo (GCF, GEF, KfW, patrimoniales, Banco Mundial, fundaciones privadas)|`Σ (participación % de cada donante en la cartera)²`|Reportes financieros internos FMCN (LOVIS / SISEP)|Anual|Privado|
|**PER** — Ratio de Eficiencia de Programas (Program Expense Ratio)|Proporción del capital fiduciario que se traduce en transferencias directas al campo (3,189 donativos) vs. costos administrativos|`Monto transferido en donativos / Gasto total de la cartera`|Reportes financieros internos FMCN (LOVIS / SISEP)|Anual|Privado|

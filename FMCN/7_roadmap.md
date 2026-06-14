## 7. Hoja de ruta de implementación

|Versión|Fecha|Cambios|
|---|---|---|
|v1.0|Junio 2025|Estimación inicial por fases, sin desglose de costos|
|v2.0|Junio 2026|Periodos revisados con base en `sow.md` (inventario detallado de trabajo de programación pendiente); añade desglose de costos por categoría — licencias/suscripciones, consultoría de implementación y capacitación|

### 7.1 Fases y entregables (revisado)

|Fase|Periodo (rev. v2.0)|Periodo (v1.0)|Entregables clave (`sow.md`)|Dependencias|
|---|---|---|---|---|
|**0 — Validación**|Semanas 1-4|Semanas 1-2|Validación del modelo de datos con equipos de programas FMCN; acuerdo en fuentes/periodicidad de KPIs; **contrato de integración LOVIS/SISEP** (`sow.md` §2.5); definición del modelo de roles RBAC (§3.2)|Equipo de programas FMCN|
|**1 — MVP**|Semanas 5-16|Semanas 3-8|Infraestructura base (§1); 12 programas piloto + shapefiles CONANP cargados a PostGIS (§2.1-2.3); modelos GeoDjango + endpoints/fragmentos HTMX Z-1/Z-3/Z-4 básicos (§3.1-3.3); migración de las 4 pantallas estáticas a templates Django/HTMX (§4.1-4.2); pruebas unitarias e integración (§5.1-5.2); CI/CD + staging (§6)|Datos de Cartera FMCN 2025; shapefiles CONANP|
|**2 — Beta**|Semanas 17-32|Semanas 9-18|Capas INEGI completas (uso de suelo + hidrografía) con `ST_Simplify`/teselas (§1,§2.3); ETL CONABIO/CONAFOR/CONAGUA (§2.4); semáforo de KPI con datos reales (§3.4); cartera completa (26 programas); filtros Z-2 completos; pruebas de rendimiento < 500 ms (§5.3)|API/datasets CONANP+INEGI+CONABIO; ETL validado|
|**3 — Producción**|Semanas 33-52|Semanas 19-28|Histórico KPI 2015-2025 (§2.6); línea de tiempo + comparación de periodos (§3.5); RBAC completo, 5 roles incl. *socio gubernamental* y *analista de datos* (§3.2); mapa avanzado privado + export PNG/PDF (§3.6, §4.3); API de datos abiertos (§3.9); pruebas E2E y seguridad (§5.4-5.5); despliegue productivo (§6); integración WordPress (§4.6, §6)|Datos históricos validados; infraestructura cloud productiva|
|**4 — Evolución**|Desde semana 53 (~año 2)|Desde semana 29|Celery/Redis para refresco automático de KPIs y alertas (§1, §3.9); módulos secundarios del landing privado — Mis proyectos, Alertas territoriales, Matriz de priorización, Generar reporte, Administración (§3.8); módulo de reportes personalizados para donantes|Acuerdos de datos CONANP/CONAFOR/CONABIO|

> **Por qué se revisan los periodos al alza**: v1.0 estimaba "Producción" completa (línea de tiempo + RBAC + API abierta) en 28 semanas (~6.5 meses). `sow.md` muestra que solo el backend (§3) implica ~10 endpoints/fragmentos HTMX, 6 capas GeoJSON con filtrado público/privado, RBAC de 5 roles, exportación PDF/CSV real y línea de tiempo con histórico — además de migrar 4 pantallas completas (§4) y montar ETL desde 5 fuentes gubernamentales distintas (§2). El total revisado lleva las Fases 0-3 a ~12 meses (semana 52), alineado con el horizonte de implementación de `casopractico.md`; la Fase 4 queda para el año 2.

---

### 7.2 Costos por categoría

`casopractico.md` establece un presupuesto indicativo de **$300,000 MXN para el primer año**, destinado a licencias/suscripciones, consultoría de implementación y capacitación (no incluye el tiempo propio del Oficial de Innovación Tecnológica de FMCN). El siguiente desglose ubica cada partida de `sow.md` en una de estas tres categorías y la fase en que se incurre.

#### A. Licencias y suscripciones (OPEX recurrente)

El stack (`6_stack.md`) es 100% open source (Django, PostGIS, Leaflet, Chart.js, HTMX, Celery/Redis) — **no hay licencias de software propietario**. El costo recurrente corresponde a **servicios gestionados en la nube** (`sow.md` §1):

|Ítem|Activo desde|Estimado|
|---|---|---|
|Hosting app Django (VM/contenedor)|Fase 1|~$450 MXN/mes|
|PostgreSQL + PostGIS gestionado (con backups)|Fase 1|~$1,100 MXN/mes|
|Almacenamiento de objetos (exports/GeoJSON, §3.6)|Fase 1 (uso intensivo desde Fase 3)|~$150 MXN/mes|
|Redis gestionado (§3.9)|Fase 4|~$280 MXN/mes|
|Tile server gestionado (si no se autohospeda, §1)|Fase 2 (opcional)|~$0-740 MXN/mes|
|Error tracking / monitoreo|Fase 1|~$0 (plan gratuito suele bastar)|
|Dominio + SSL|Fase 1|~$280 MXN/año (SSL vía Let's Encrypt, $0)|

**Total recurrente**: ~$1,800-2,700 MXN/mes (~**$22,000-32,000 MXN/año**) en Fases 1-2; sube a ~$32,000-46,000 MXN/año desde Fase 4 al activar Redis/tile server. Cabe holgadamente dentro de los $300,000 MXN/año.

#### B. Consultoría de implementación (la partida mayor)

Trabajo especializado de `sow.md` que excede la capacidad de una sola persona en los plazos de §7.1:

| Ítem                                                                                                     | Fase | Por qué requiere consultoría externa                                            | Estimado     |
| -------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------- | ------------ |
| Contrato/análisis integración LOVIS/SISEP (§2.5)                                                         | 0    | Requiere conocer el sistema interno FMCN — retainer con su proveedor/mantenedor | $15,000 MXN  |
| ETL shapefiles CONANP → PostGIS (§2.2-2.3)                                                               | 1    | Especialista GIS/geopandas/GDAL para proyecciones y formatos oficiales          | $40,000 MXN  |
| Desarrollo GeoDjango + HTMX, modelos y endpoints básicos + migración de 4 pantallas (§3.1-3.3, §4.1-4.2) | 1    | Volumen de trabajo (backend + frontend + CI/CD) excede 1 persona en 12 semanas  | $150,000 MXN |
| ETL INEGI/CONABIO/CONAFOR/CONAGUA (§2.4)                                                                 | 2    | 4 fuentes oficiales adicionales, formatos y periodicidades distintas            | $80,000 MXN  |
| Filtros Z-2 completos + semáforo real (§3.3-3.4)                                                         | 2    | Continuación del desarrollo backend/frontend                                    | $100,000 MXN |
| Optimización geoespacial `ST_Simplify`/teselas (§1, §2.3)                                                | 2    | Especialista PostGIS para cumplir < 500 ms (`5_crtaceptacion.md`)               | $35,000 MXN  |
| Implementación LOVIS/SISEP + RBAC 5 roles (§3.2, §2.5)                                                   | 3    | Integración de sistemas internos + lógica de permisos                           | $50,000 MXN  |
| Línea de tiempo, histórico, exports PDF/CSV, mapa avanzado, API abierta (§3.5, §3.6, §3.9, §4.3)         | 3    | Bloque grande de desarrollo final de producción                                 | $150,000 MXN |
| Revisión de seguridad/RBAC pre-producción (§5.5)                                                         | 3    | Auditoría externa de control de acceso público/privado                          | $35,000 MXN  |
| Integración WordPress `iframe`/`postMessage` (§4.6)                                                      | 3    | Especialista WordPress/PHP, fuera del stack Django                              | $20,000 MXN  |

**Subtotal por fase**: Fase 0 = $15,000 · Fase 1 = $190,000 · Fase 2 = $215,000 · Fase 3 = $255,000 → **Total Fases 0-3 ≈ $675,000 MXN**.

#### C. Capacitación

|Ítem|Fase|A quién|Estimado|
|---|---|---|---|
|Taller de uso del panel admin Django (alta/edición de programas y KPIs)|1|Equipo de programas (rol `tecnico`)|$10,000 MXN|
|Taller de interpretación del dashboard BI y exportaciones|2|Dirección/Consejo (`admin`), comunicación|$10,000 MXN|
|Taller de operación del repositorio de datos, permisos por rol y línea de tiempo|3|Analista de datos, socio gubernamental|$15,000 MXN|
|Capacitación de mantenimiento de pipelines ETL (§2.4)|3-4|Equipo técnico FMCN o sucesor del Oficial de Innovación|$10,000 MXN|

**Total capacitación Fases 1-3**: ~$45,000 MXN.

---

### 7.3 Resumen de presupuesto y brecha vs. presupuesto indicativo

|Fase|Periodo|Suscripciones|Consultoría|Capacitación|Subtotal|
|---|---|---|---|---|---|
|0|Sem. 1-4|~$2,000|$15,000|—|~$17,000|
|1|Sem. 5-16|~$8,000|$190,000|$10,000|~$208,000|
|2|Sem. 17-32|~$10,000|$215,000|$10,000|~$235,000|
|3|Sem. 33-52|~$12,000|$255,000|$25,000|~$292,000|
|**Total Fases 0-3 (~12 meses)**|Sem. 1-52|**~$32,000**|**~$675,000**|**~$45,000**|**~$752,000 MXN**|
|4 (anual, en adelante)|Año 2+|~$38,000|variable (soporte/retainer)|~$10,000|~$48,000 + soporte|

**Brecha**: el alcance completo de `sow.md` para Fases 0-3 cuesta ≈ **$752,000 MXN en ~12 meses**, frente al presupuesto indicativo de **$300,000 MXN/año** de `casopractico.md` — aproximadamente **2.5×**. Opciones para cerrar la brecha:

1. **Extender el calendario**: repartir Fases 1-3 en ~2.5 años en lugar de 1, manteniendo el gasto anual cerca de $300,000 MXN (consultoría escalonada por fase).
2. **Recortar alcance del año 1**: ejecutar Fases 0-1 (≈ $225,000 MXN) dentro del primer año con el presupuesto indicativo, y presupuestar Fases 2-3 (≈ $527,000 MXN) como inversión adicional en el año 2.
3. **Asegurar presupuesto adicional**: si FMCN requiere el sistema completo en 12 meses, solicitar ~$450,000 MXN adicionales sobre el presupuesto indicativo, concentrados en consultoría (categoría B).

La **Fase 4 (mantenimiento/evolución)**, una vez en operación, sí cabe dentro de $300,000 MXN/año (≈ $48,000 MXN en suscripciones/capacitación + soporte puntual), por lo que el costo recurrente de largo plazo es sostenible — el cuello de botella es la **inversión inicial concentrada de consultoría en Fases 1-3**.

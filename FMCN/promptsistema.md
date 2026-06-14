# Plataforma de Inteligencia Territorial FMCN

## Especificación de producto

**Fondo Mexicano para la Conservación de la Naturaleza** Versión 1.0 · Junio 2026

---

## Índice

1. [Descripción general](https://claude.ai/chat/ccfc3146-e74d-438c-8754-ac8ab179e0b7#1-descripci%C3%B3n-general)
2. [Arquitectura de acceso](https://claude.ai/chat/ccfc3146-e74d-438c-8754-ac8ab179e0b7#2-arquitectura-de-acceso)
3. [Módulo de mapa interactivo](https://claude.ai/chat/ccfc3146-e74d-438c-8754-ac8ab179e0b7#3-m%C3%B3dulo-de-mapa-interactivo)
4. [Módulo de BI y desempeño de proyectos](https://claude.ai/chat/ccfc3146-e74d-438c-8754-ac8ab179e0b7#4-m%C3%B3dulo-de-bi-y-desempe%C3%B1o-de-proyectos)
5. [Exportación y rendición de cuentas](https://claude.ai/chat/ccfc3146-e74d-438c-8754-ac8ab179e0b7#5-exportaci%C3%B3n-y-rendici%C3%B3n-de-cuentas)
6. [Secciones adicionales recomendadas](https://claude.ai/chat/ccfc3146-e74d-438c-8754-ac8ab179e0b7#6-secciones-adicionales-recomendadas)
7. [Estructura de navegación](https://claude.ai/chat/ccfc3146-e74d-438c-8754-ac8ab179e0b7#7-estructura-de-navegaci%C3%B3n)
8. [Requisitos técnicos](https://claude.ai/chat/ccfc3146-e74d-438c-8754-ac8ab179e0b7#8-requisitos-t%C3%A9cnicos)

---

## 1. Descripción general

Diseño de una plataforma web de visualización territorial y rendición de cuentas para el Fondo Mexicano para la Conservación de la Naturaleza (FMCN). La plataforma opera en dos modos diferenciados:

- **Versión pública** — accesible sin autenticación, orientada a comunicación institucional y donantes potenciales.
- **Versión privada** — con login seguro y control de acceso por rol, para equipos internos y donantes institucionales activos.

---

## 2. Arquitectura de acceso

### 2.1 Versión pública

Accesible sin credenciales. Presenta en una sola pantalla:

- Mapa interactivo de intervenciones territoriales.
- Panel de indicadores clave de desempeño institucional (KPIs agregados).
- Contenido curado, actualizado trimestralmente.
- Orientada a comunicación con el público general y donantes potenciales y actuales.

**Indicadores visibles públicamente:**

|Indicador|Descripción|
|---|---|
|Hectáreas protegidas|Total acumulado bajo gestión FMCN|
|Proyectos activos|Número de proyectos en ejecución|
|Especies monitoreadas|Especies de flora y fauna bajo seguimiento|
|Comunidades beneficiadas|Comunidades en zonas de intervención|

### 2.2 Versión privada

Requiere autenticación gestionada por Django (auth + grupos/permisos para RBAC); MFA vía `django-otp` o SSO externo (Auth0/Keycloak) — componente complementario, ver `6_stack.md` §6.3. El acceso se gestiona por roles:

| Rol                        | Acceso                                                                 |
| -------------------------- | ---------------------------------------------------------------------- |
| Administrador FMCN         | Todos los datos, capas GIS, reportes en borrador, gestión de usuarios  |
| Equipo técnico de proyecto | Proyectos asignados, datos fuente, alertas territoriales               |
| Donante institucional      | Solo sus proyectos, métricas asociadas, generación de reportes propios |

> **Principio de aislamiento:** Los administradores acceden a todos los datos, incluyendo capas GIS, datos fuente y reportes en borrador. Funcionalidades de descarga de datos y generacion de reportes no estan disponibles en versiones publicas. Los donantes no tienen accesos al sistema. 

## 3. Módulo de mapa interactivo

El mapa es el componente central de ambas versiones.

### 3.1 Capas base (versión pública y privada)

- Polígonos de intervención activa e histórica.
- Áreas protegidas bajo gestión de FMCN.
- Puntos de monitoreo de campo.

### 3.2 Filtros disponibles

- Región geográfica.
- Período de intervención (rango de años).
- Fuente de financiamiento / donante.

### 3.3 Capas adicionales (solo versión privada)

- Datos de financiamiento de intervenciones 
- Datos de deforestación satelital (MODIS, Global Forest Change).
- Indicadores de presión y amenaza territorial.
- Polígonos en negociación o prospección.
- Capas de biodiversidad y servicios ecosistémicos.

### 3.4 Exportación de mapa

El mapa debe permitir exportación en alta resolución para uso en reportes institucionales por usuarios internos (requiere `leaflet-image`/`html2canvas` + generación PDF en Django — complemento no cubierto por el stack base, ver `6_stack.md` §6.3):

- Formatos: **PNG** y **PDF**.
- Selección de extensión geográfica y capas visibles al momento de exportar.
- Estampado automático de fecha y versión.

## 4. Módulo de BI y desempeño de proyectos

### 4.1 Versión privada — dashboards por proyecto

Dashboards nativos construidos con Django + HTMX: fragmentos de tablas, tarjetas KPI y semáforo de riesgo por proyecto, calculados sobre PostGIS y filtrados según el rol del usuario (permisos Django) — ver `6_stack.md` §6.1-6.2.

**Ficha por proyecto:**

- Avance financiero (presupuesto vs. ejercido).
- Porcentaje de cumplimiento de indicadores de resultados.
- Semáforo de riesgo (verde / amarillo / rojo).
- Próximos hitos y fechas clave.
- Documentos adjuntos (informes, evidencias).

### 4.2 Versión pública — indicadores agregados

Muestra únicamente indicadores consolidados a nivel institucional, sin datos financieros ni operativos de proyectos individuales.

---

## 5. Exportación y rendición de cuentas

### 5.1 Generación de reportes

La plataforma genera reportes descargables en PDF (vía WeasyPrint/ReportLab sobre Django — complemento, ver `6_stack.md` §6.3) con:

- Mapa con capas seleccionadas.
- Indicadores clave del período.
- Tabla de avance por indicador.

### 5.2 Plantillas diferenciadas

| Tipo de donante                          | Plantilla                                                      |
| ---------------------------------------- | -------------------------------------------------------------- |
| Donantes internacionales institucionales | USAID, GEF, Unión Europea — con formatos de reporte requeridos |
| Fundaciones privadas                     | Formato ejecutivo con énfasis en impacto territorial           |
| Reporte público general                  | Versión divulgativa sin datos financieros                      |

### 5.3 Metadatos del reporte

Todos los reportes incluyen:

- Fecha y hora de generación.
- Versión del informe.
- Nivel de confidencialidad: público / restringido / confidencial.
- Nombre del usuario que generó el reporte (solo versión privada).

## 6. Secciones adicionales

### 6.1 Línea de tiempo de conservación `[Público]`

Historia interactiva de 30+ años de FMCN. Hitos por año, expansión territorial, cobertura por fondos. Refuerza narrativa institucional ante donantes actuales y potenciales.

### 6.2 Matriz de priorización de áreas `[Privado]`

Herramienta de apoyo a decisiones estratégicas:

- Clasificación de áreas con mayor urgencia de intervención.
- Criterios: amenaza territorial, valor de biodiversidad, viabilidad operativa, costo-efectividad.
- Visualización en mapa y tabla comparativa.
- Exportable para presentación al consejo directivo.

---

## 7. Estructura de navegación

### 7.1 Versión pública

```
Inicio
├── Mapa interactivo (integrado con KPIs)
├── Historia FMCN (línea de tiempo)
└── Conviértete en donante / Contacto
```

### 7.2 Versión privada

```
Dashboard personal
├── Mis proyectos
│   ├── Ficha de proyecto
│   ├── Avance financiero
│   └── Indicadores de resultados
├── Mapa avanzado
│   ├── Capas base
│   ├── Capas privadas
│   └── Exportar mapa
├── BI & Indicadores
│   └── Dashboards por proyecto (fragmentos HTMX renderizados por Django)
├── Repositorio de datos
│   ├── Shapefiles y capas GIS
│   └── Datos de monitoreo de campo
├── Generar reporte
│   ├── Seleccionar plantilla
│   └── Descargar PDF
├── Alertas territoriales
├── Matriz de priorización
└── Administración (solo admin)
    ├── Gestión de usuarios y roles
    ├── Configuración de capas
    └── Log de acceso y auditoría
```

---

## 8. Requisitos técnicos

### 8.1 Frontend

- Plataforma web responsiva (desktop y móvil), construida con Django (templates) + HTMX para fragmentos interactivos: filtros, paneles de detalle, tablas y tarjetas KPI (`6_stack.md` §6.1-6.2).
- Mapa construido sobre Leaflet y GeoJSON, servido por vistas GeoDjango sobre PostGIS.
- Fragmentos de BI (tablas, KPI cards, semáforos) servidos vía HTMX desde Django; aislamiento de datos por donante mediante permisos de Django + Row Level Security (RLS) en PostgreSQL.

### 8.2 Seguridad y acceso

- Autenticación: sistema de auth de Django; MFA mediante `django-otp` o SSO externo (Auth0/Keycloak) para versión privada — complemento, ver `6_stack.md` §6.3.
- Autorización: control de acceso basado en roles (RBAC) vía Django Groups/Permissions; el filtrado público/privado (`nivel_acceso`, `nivel_acceso_financiero` de `4_datastr.md` §4.1) se aplica en las vistas, no solo en la UI.
- Auditoría: log de acceso a datos sensibles con trazabilidad por usuario.
- Cifrado en tránsito (TLS 1.2+) y en reposo para datos fuente.

### 8.3 Integración de datos

- Conexión a fuentes de datos satelitales (MODIS, GFC) para alertas.
- API para sincronización con sistemas internos de seguimiento de proyectos.
- Carga de shapefiles y capas GIS en formatos estándar (.shp, .geojson, .kml) hacia PostGIS, vía pipeline Python (geopandas + GDAL/ogr2ogr) — complemento de integración, ver `6_stack.md` §6.3.

### 8.4 Identidad visual

- Diseño consistente con la identidad visual institucional de FMCN.
- Plantillas de exportación con logo, paleta de colores y tipografía institucional.
- Versión en español como idioma principal; soporte opcional en inglés para reportes a donantes internacionales.

---

_Documento elaborado para apoyar la toma de decisiones de diseño y desarrollo de la Plataforma de Inteligencia Territorial de FMCN._
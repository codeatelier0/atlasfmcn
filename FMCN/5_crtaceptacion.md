## 5. Criterios de aceptación

Cada historia de usuario se considera completa cuando cumple todos sus criterios de aceptación.

|Historia de usuario|Criterios de aceptación|
|---|---|
|**Exploración geográfica** (filtro por tipo de ecosistema)|1. Al seleccionar un filtro, el mapa actualiza en < 500 ms. 2. Las burbujas no seleccionadas se atenúan (opacity 0.1). 3. La barra de KPIs globales recalcula para el subconjunto filtrado. 4. El botón "Limpiar filtros" restaura la vista completa.|
|**Panel de detalle del programa**|1. El panel se despliega al hacer clic sobre cualquier burbuja del mapa. 2. Muestra todas las pestañas: Identidad, Indicadores, KPIs y Descarga. 3. Los enlaces a fuentes oficiales abren en pestaña nueva sin salir del mapa. 4. La descarga en CSV incluye todos los campos del modelo de datos.|
|**Semáforo de KPI**|1. Verde = KPI en rango de meta; amarillo = alerta; rojo = deterioro crítico. 2. La capa distingue entre áreas con y sin financiamiento FMCN. 3. Tooltip muestra el valor exacto del KPI y la fecha del dato.|
|**Línea de tiempo**|1. El slider opera en pasos anuales de 2015 a 2025. 2. Al cambiar el año, burbujas y KPIs se actualizan para ese corte histórico. 3. El modo comparación muestra dos columnas de KPIs para los años elegidos.|

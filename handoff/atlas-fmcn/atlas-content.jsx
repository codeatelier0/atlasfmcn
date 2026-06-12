/* ====================================================================
   atlas-content.jsx — bodies of the 15 source documents, keyed by slug.
   ⚠ PLACEHOLDER content: replace each entry with the real markdown
   from /FMCN/*.md when the source folder is linked.
   Markdown (GFM, tables supported) for regular docs;
   raw preformatted text for prompt docs (prompt: true).
   ==================================================================== */

const PH = (file, expected) => `> ⏳ **Contenido pendiente** — este cuerpo se sustituirá con el markdown real de \`${file}\` cuando se vincule la carpeta fuente.

${expected}`;

const ATLAS_DOCS_BODIES = {
  "resumen": PH("1_resumen.md", `## Estructura esperada

Resumen ejecutivo del documento de especificación funcional: propósito del Atlas, audiencias, alcance del MVP y resultados esperados.`),

  "historias-de-usuario": PH("2_userstory.md", `## Estructura esperada

Historias de usuario por rol (donante, aliado, equipo FMCN, público general), con contexto y necesidad.

| Rol | Historia | Necesidad |
|---|---|---|
| — | — | — |`),

  "dashboard": PH("3_bi.md", `## Estructura esperada

Descripción del tablero de datos: zonas funcionales (Z-1 a Z-4), componentes de UI, filtros y niveles de acceso.`),

  "modelo-de-datos": PH("4_datastr.md", `## Estructura esperada

Modelo de entidades: \`Programa\`, enum \`tipo_intervencion\` (anp/cuenca/costero/paisaje/especie), KPIs y relaciones.`),

  "criterios-de-aceptacion": PH("5_crtaceptacion.md", `## Estructura esperada

Criterios de aceptación verificables por historia de usuario (formato Given/When/Then).`),

  "stack-tecnologico": PH("6_stack.md", `## Estructura esperada

Stack recomendado y justificación: Django + HTMX, PostGIS, Leaflet, Chart.js (§6.3).`),

  "roadmap": PH("7_roadmap.md", `## Estructura esperada

Hoja de ruta por fases: MVP, capas adicionales, internacionalización, integraciones.`),

  "glosario": PH("8_glosario.md", `## Estructura esperada

Glosario de términos técnicos y de conservación (ANP, ADVC, PAMIC, cuenca, etc.).`),

  "contenido-editorial": PH("Contenido.md", `## Estructura esperada

Textos editoriales del mapa: introducción general, fichas por programa y cierre / llamada a la acción.`),

  "datos-de-impacto": PH("Dataimpacto.md", `## Estructura esperada

Datos cuantitativos por programa: ubicación, hectáreas, financiamiento, personas beneficiadas, organizaciones, especies.`),

  "fuentes-de-datos": PH("Fuentedatos.md", `## Estructura esperada

Fuentes oficiales: CONANP, INEGI, CONABIO, registros internos FMCN.`),

  "identidad-visual": PH("visualbrand.md", `## Estructura esperada

Análisis de la identidad visual de fmcn.org: tipografía (Lato / Open Sans), paleta institucional, accesibilidad e idiomas.`),

  "prompt-mapa": `⏳ PENDIENTE — sustituir con el texto íntegro de "Prompt mapa.md".

Prompt de diseño/generación del mapa interactivo (Zona 3): capas, enum tipo_intervencion,
colores semánticos, visualización base (CartoDB Positron, centro 23.6345/-102.5528, zoom 5)
y lógica de burbujas proporcionales.`,

  "prompt-ux": `⏳ PENDIENTE — sustituir con el texto íntegro de "Prompt ux.md".

Prompt de diseño UX del producto.`,

  "prompt-sistema": `⏳ PENDIENTE — sustituir con el texto íntegro de "promptsistema.md".

Prompt de sistema del proyecto (app Django + HTMX + PostGIS: modelos, vistas, permisos, fixtures).`,
};

window.ATLAS_DOCS_BODIES = ATLAS_DOCS_BODIES;

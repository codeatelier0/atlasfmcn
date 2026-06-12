/* ====================================================================
   atlas-data.jsx — registry + cover copy for the Atlas FMCN case study.
   Doc bodies live in window.ATLAS_DOCS_BODIES (atlas-content.jsx).
   UI chrome is bilingual; original documents are Spanish-only.
   ==================================================================== */

const ATLAS = {
  meta: {
    title: "Atlas FMCN",
    sub: {
      es: "Mapa Interactivo de Impacto de Financiamiento — Fondo Mexicano para la Conservación de la Naturaleza",
      en: "Interactive Funding-Impact Map — Mexican Fund for the Conservation of Nature",
    },
    breadcrumbRoot: "asalamanca.work",
    breadcrumbSection: { es: "proyectos", en: "work" },
    year: "2025–2026",
    role: { es: "Product Owner / PM de TI orientado a datos", en: "Product Owner / Data-Driven IT PM" },
    client: { es: "FMCN (proyecto de especificación)", en: "FMCN (specification project)" },
    deliverable: { es: "Especificación funcional + prototipo", en: "Functional spec + prototype" },
  },

  cover: {
    kicker: { es: "/ case study", en: "/ case study" },
    blurb: {
      es: "Diseñé de punta a punta la especificación de un atlas interactivo que comunica el impacto territorial del portafolio de conservación del FMCN: historias de usuario, modelo de datos, criterios de aceptación, stack, roadmap — y un prototipo funcional co-creado con IA.",
      en: "I designed end-to-end the specification for an interactive atlas communicating the territorial impact of FMCN's conservation portfolio: user stories, data model, acceptance criteria, stack, roadmap — and a working prototype co-created with AI.",
    },
    cta1: { es: "Explorar la documentación", en: "Explore the docs" },
    cta2: { es: "// ver demo interactiva", en: "// view live demo" },
    chips: ["Product Ownership", "Especificación funcional", "Django + HTMX", "PostGIS", "Leaflet", "Diseño asistido por IA"],

    panelsTitle: { es: "El encargo", en: "The brief" },
    panels: [
      {
        no: "01",
        title: { es: "El problema", en: "The problem" },
        body: {
          es: "El FMCN financia 26 proyectos de conservación en todo México, pero su impacto territorial — hectáreas, personas, organizaciones, especies — vivía disperso en reportes. Hacía falta una sola vista navegable para donantes, aliados y público.",
          en: "FMCN funds 26 conservation projects across Mexico, but their territorial impact — hectares, people, organizations, species — lived scattered across reports. A single navigable view was needed for donors, partners and the public.",
        },
      },
      {
        no: "02",
        title: { es: "Mi rol", en: "My role" },
        body: {
          es: "Como Product Owner definí la visión de producto y la traduje a artefactos accionables: historias de usuario por rol, zonas funcionales del tablero, modelo de entidades, criterios de aceptación verificables y un roadmap por fases.",
          en: "As Product Owner I defined the product vision and translated it into actionable artifacts: per-role user stories, dashboard functional zones, an entity model, verifiable acceptance criteria and a phased roadmap.",
        },
      },
      {
        no: "03",
        title: { es: "Lo que entregué", en: "What I delivered" },
        body: {
          es: "Un documento viviente de especificación (8 capítulos), 4 documentos de contenido y datos, 3 prompts de diseño para co-crear con IA, y un prototipo estático funcional del mapa que sirve de referencia para el build en Django + HTMX + PostGIS.",
          en: "A living specification document (8 chapters), 4 content & data documents, 3 design prompts for AI co-creation, and a working static prototype of the map serving as reference for the Django + HTMX + PostGIS build.",
        },
      },
    ],

    demoTitle: { es: "Demo interactiva", en: "Live demo" },
    demoIntro: {
      es: "Prototipo estático del mapa de impacto — Leaflet + Chart.js, datos reales del portafolio 2025 hardcodeados, ES/EN. Co-creado con IA a partir del prompt de diseño documentado en este case study.",
      en: "Static prototype of the impact map — Leaflet + Chart.js, real 2025 portfolio data hardcoded, ES/EN. Co-created with AI from the design prompt documented in this case study.",
    },
    demoOpen: { es: "Abrir en pestaña completa", en: "Open full tab" },
    demoBar: "atlas-fmcn · prototipo v1 — mapa de impacto",

    linksTitle: { es: "Entradas destacadas", en: "Featured entries" },
    linksIntro: {
      es: "Cuatro puertas de entrada al trabajo de especificación.",
      en: "Four entry points into the specification work.",
    },
    featuredSlugs: ["historias-de-usuario", "modelo-de-datos", "criterios-de-aceptacion", "roadmap"],

    indexTitle: { es: "Toda la documentación", en: "All documentation" },
    indexIntro: {
      es: "15 documentos navegables — el documento viviente completo del proyecto.",
      en: "15 navigable documents — the project's complete living document.",
    },
    openDoc: { es: "Leer documento", en: "Read document" },
  },

  ui: {
    backToCover: { es: "← Volver al case study", en: "← Back to case study" },
    backToPortfolio: { es: "← asalamanca.work", en: "← asalamanca.work" },
    docs: { es: "documentación", en: "docs" },
    prev: { es: "Anterior", en: "Previous" },
    next: { es: "Siguiente", en: "Next" },
    copy: { es: "Copiar", en: "Copy" },
    copied: { es: "Copiado ✓", en: "Copied ✓" },
    copyAll: { es: "Copiar prompt completo", en: "Copy full prompt" },
    onThisSite: { es: "Documento original en español.", en: "Original document in Spanish." },
    sourceFile: { es: "Archivo fuente", en: "Source file" },
    promptNote: {
      es: "Prompt de diseño usado para co-crear el producto con IA — se publica íntegro como evidencia del método de trabajo.",
      en: "Design prompt used to co-create the product with AI — published in full as evidence of the working method.",
    },
  },

  groups: [
    { id: "spec", label: { es: "Especificación funcional", en: "Functional spec" } },
    { id: "impl", label: { es: "Implementación", en: "Implementation" } },
    { id: "content", label: { es: "Contenido y datos", en: "Content & data" } },
    { id: "prompts", label: { es: "Prompts de diseño", en: "Design prompts" } },
  ],

  docs: [
    { slug: "resumen", file: "1_resumen.md", group: "spec",
      title: { es: "Resumen ejecutivo", en: "Executive summary" },
      desc: { es: "Resumen ejecutivo del documento de especificación funcional", en: "Executive summary of the functional specification document" } },
    { slug: "historias-de-usuario", file: "2_userstory.md", group: "spec",
      title: { es: "Historias de usuario", en: "User stories" },
      desc: { es: "Historias de usuario, roles, contexto y necesidad", en: "User stories, roles, context and need" } },
    { slug: "dashboard", file: "3_bi.md", group: "spec",
      title: { es: "Tablero de datos", en: "Data dashboard" },
      desc: { es: "Descripción del tablero de datos (zonas funcionales, componentes UI)", en: "Data-dashboard description (functional zones, UI components)" } },
    { slug: "modelo-de-datos", file: "4_datastr.md", group: "spec",
      title: { es: "Modelo de datos", en: "Data model" },
      desc: { es: "Propuesta de estructura de datos / modelo de entidades", en: "Proposed data structure / entity model" } },
    { slug: "criterios-de-aceptacion", file: "5_crtaceptacion.md", group: "spec",
      title: { es: "Criterios de aceptación", en: "Acceptance criteria" },
      desc: { es: "Criterios de aceptación por historia de usuario", en: "Acceptance criteria per user story" } },
    { slug: "stack-tecnologico", file: "6_stack.md", group: "impl",
      title: { es: "Stack tecnológico", en: "Tech stack" },
      desc: { es: "Stack tecnológico recomendado y justificación", en: "Recommended tech stack and rationale" } },
    { slug: "roadmap", file: "7_roadmap.md", group: "impl",
      title: { es: "Roadmap", en: "Roadmap" },
      desc: { es: "Hoja de ruta de implementación por fases", en: "Phased implementation roadmap" } },
    { slug: "glosario", file: "8_glosario.md", group: "impl",
      title: { es: "Glosario", en: "Glossary" },
      desc: { es: "Glosario de términos técnicos y de conservación", en: "Glossary of technical and conservation terms" } },
    { slug: "contenido-editorial", file: "Contenido.md", group: "content",
      title: { es: "Contenido editorial", en: "Editorial content" },
      desc: { es: "Contenido editorial del mapa (textos, fichas por programa)", en: "Editorial content of the map (texts, per-program profiles)" } },
    { slug: "datos-de-impacto", file: "Dataimpacto.md", group: "content",
      title: { es: "Datos de impacto", en: "Impact data" },
      desc: { es: "Datos de impacto / indicadores por programa", en: "Impact data / indicators per program" } },
    { slug: "fuentes-de-datos", file: "Fuentedatos.md", group: "content",
      title: { es: "Fuentes de datos", en: "Data sources" },
      desc: { es: "Fuentes de datos oficiales (CONANP, INEGI, CONABIO, etc.)", en: "Official data sources (CONANP, INEGI, CONABIO, etc.)" } },
    { slug: "identidad-visual", file: "visualbrand.md", group: "content",
      title: { es: "Identidad visual", en: "Visual identity" },
      desc: { es: "Análisis de estilo visual y criterios de UX del sitio FMCN", en: "Visual-style analysis and UX criteria of the FMCN site" } },
    { slug: "prompt-mapa", file: "Prompt mapa.md", group: "prompts", prompt: true,
      title: { es: "Prompt · Mapa", en: "Prompt · Map" },
      desc: { es: "Prompt de diseño/generación del mapa interactivo", en: "Design/generation prompt for the interactive map" } },
    { slug: "prompt-ux", file: "Prompt ux.md", group: "prompts", prompt: true,
      title: { es: "Prompt · UX", en: "Prompt · UX" },
      desc: { es: "Prompt de diseño UX", en: "UX design prompt" } },
    { slug: "prompt-sistema", file: "promptsistema.md", group: "prompts", prompt: true,
      title: { es: "Prompt · Sistema", en: "Prompt · System" },
      desc: { es: "Prompt de sistema del proyecto", en: "Project system prompt" } },
  ],
};

window.ATLAS = ATLAS;

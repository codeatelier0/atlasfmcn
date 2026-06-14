/* ====================================================================
   atlas-data.jsx — registry + cover copy for the Atlas FMCN case study.
   Doc bodies fetched from /FMCN/*.md via window.loadDocBody (atlas-content.jsx).
   UI chrome is bilingual; original documents are Spanish-only.
   ==================================================================== */

const ATLAS = {
  meta: {
    title: "Atlas FMCN",
    sub: {
      es: "Plataforma Interactiva de Visualización de Impacto de Financiamiento — Fondo Mexicano para la Conservación de la Naturaleza",
      en: "Interactive Funding-Impact Platform — Mexican Fund for the Conservation of Nature",
    },
    breadcrumbRoot: "asalamanca.work",
    breadcrumbSection: { es: "proyectos", en: "work" },
    year: "2025–2026",
    role: { es: "Product Owner / Business Analyst / Product Builder", en: "Product Owner / Data-Driven IT PM" },
    client: { es: "FMCN (proyecto de especificación)", en: "FMCN (specification project)" },
    deliverable: { es: "Especificación funcional + prototipo", en: "Functional spec + prototype" },
  },

  cover: {
    kicker: { es: "/ case study", en: "/ case study" },
    blurb: {
      es: "Diseñé de punta a punta la especificación de una plataforma interactiva que comunica el impacto territorial del portafolio de conservación del FMCN y un website público con versiones restringidas de la información: historias de usuario, modelo de datos, criterios de aceptación, stack y un prototipo funcional co-creado con IA.",
      en: "I designed end-to-end the specification for an interactive atlas communicating the territorial impact of FMCN's conservation portfolio: user stories, data model, acceptance criteria, stack, and a working prototype co-created with AI.",
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
          es: "El FMCN financia 26 proyectos de conservación en todo México, pero sus equipos de decision y audiencias sólo pueden ver su información de impacto territorial dispersa en reportes en PDF. Hacía falta una solución que visibilizara su impacto en una sola vista navegable para audiencias internas y externas.",
          en: "FMCN funds 26 conservation projects across Mexico, but its decision-making teams and audiences can only consult information about its territorial impact in scattered PDF reports. A solution was needed to make that impact visible in a single navigable view for both internal and external audiences.",
        },
      },
      {
        no: "02",
        title: { es: "Mi rol", en: "My role" },
        body: {
          es: "Como Product Owner, Business Analyst y Product Builder, transformé una necesidad institucional en un prototipo funcional: definí la visión del producto, levanté requerimientos, estructuré historias de usuario, modelo de entidades, criterios de aceptación, además de diseñar la experiencia, priorizar funcionalidades y preparar una demo para audiencias internas.",
          en: "As Product Owner, Business Analyst, and Product Builder, I transformed an institutional need into a functional prototype: I defined the product vision, gathered requirements, structured user stories, the entity model, acceptance criteria, while also designing the experience, prioritizing features, and preparing a demo for internal stakeholders.",
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
      es: "Prototipo estático de la portada pública del sitio — presenta el impacto territorial del FMCN (26 proyectos activos, 53.5 millones de hectáreas, 369 organizaciones locales) y enlaza al mapa interactivo. Co-creado con IA a partir de la estrategia de prompting living documentation documentada en este case study.",
      en: "Static prototype of the site's public cover page — presents FMCN's territorial impact (26 active projects, 53.5 million hectares, 369 local organizations) and links into the interactive map. Co-created with AI using a living documentation strategy documented in this case study.",
    },
    demoOpen: { es: "Abrir en pestaña completa", en: "Open full tab" },
    demoBar: "Atlas-FMCN · Prototipo v1",

    extraTitle: { es: "Otros prototipos del sistema", en: "Other system prototypes" },
    extraIntro: {
      es: "Tres vistas adicionales del mismo proyecto de especificación, diseñadas con la identidad institucional del FMCN.",
      en: "Three additional views from the same specification project, designed with FMCN's institutional identity.",
    },
    extraLinks: [
      { label: { es: "Mapa interactivo", en: "Interactive map" }, href: "../mapa_impacto_fmcn.html" },
      { label: { es: "Portal privado · landing", en: "Private portal · landing" }, href: "../landing_privado_fmcn.html" },
      { label: { es: "Portal privado · BI e indicadores", en: "Private portal · BI dashboard" }, href: "../dashboard_bi_fmcn.html" },
    ],

    linksTitle: { es: "Especificaciones", en: "Specifications" },
    linksIntro: {
      es: "Cuatro puertas de entrada al trabajo de especificación del proyecto.",
      en: "Four entry points into the specification work of this project.",
    },
    featuredSlugs: ["resumen", "historias-de-usuario", "stack-tecnologico", "roadmap"],

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
    { slug: "prompt-mapa-publico", file: "Prompt_mapa_publico.md", group: "prompts", prompt: true,
      title: { es: "Prompt · Mapa (público)", en: "Prompt · Map (public)" },
      desc: { es: "Prompt de diseño/generación del mapa interactivo público", en: "Design/generation prompt for the public interactive map" } },
    { slug: "prompt-mapa-privado", file: "prompt_mapa_privado.md", group: "prompts", prompt: true,
      title: { es: "Prompt · Mapa (privado/BI)", en: "Prompt · Map (private/BI)" },
      desc: { es: "Prompt de diseño/generación del mapa y dashboard del portal privado", en: "Design/generation prompt for the private-portal map and BI dashboard" } },
    { slug: "prompt-ux", file: "promptlandingpriv.md", group: "prompts", prompt: true,
      title: { es: "Prompt · UX (portal privado)", en: "Prompt · UX (private portal)" },
      desc: { es: "Prompt de diseño UX del portal privado / landing", en: "UX design prompt for the private portal / landing" } },
    { slug: "prompt-sistema", file: "promptsistema.md", group: "prompts", prompt: true,
      title: { es: "Prompt · Sistema", en: "Prompt · System" },
      desc: { es: "Prompt de sistema del proyecto", en: "Project system prompt" } },
  ],
};

window.ATLAS = ATLAS;

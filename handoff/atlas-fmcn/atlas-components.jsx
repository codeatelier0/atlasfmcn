/* ====================================================================
   atlas-components.jsx — Atlas FMCN case study: cover + docs subsite.
   Reads window.ATLAS (registry/copy) and window.ATLAS_DOCS_BODIES.
   Visual DNA: asalamanca.work (Space Grotesk / JetBrains Mono, dark).
   ==================================================================== */
const { useState, useEffect, useRef } = React;

// localized value picker (same convention as the portfolio site)
const AL = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "es" in v)) ? v[lang] : v;

function docHref(slug) { return "#/doc/" + slug; }

function copyText(txt, cb) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(cb, cb);
  } else {
    const ta = document.createElement("textarea");
    ta.value = txt; document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); document.body.removeChild(ta); cb();
  }
}

/* ---------------- Breadcrumbs ---------------- */
function Crumbs({ lang, doc }) {
  const A = window.ATLAS;
  return (
    <nav className="crumbs mono" aria-label="Breadcrumb">
      <a href="../index.html">{A.meta.breadcrumbRoot}</a>
      <span className="crumb-sep">/</span>
      <a href="../index.html#work">{AL(A.meta.breadcrumbSection, lang)}</a>
      <span className="crumb-sep">/</span>
      {doc ? (
        <React.Fragment>
          <a href="#/">atlas-fmcn</a>
          <span className="crumb-sep">/</span>
          <span className="crumb-here">{doc.slug}</span>
        </React.Fragment>
      ) : (
        <span className="crumb-here">atlas-fmcn</span>
      )}
    </nav>
  );
}

/* ---------------- Cover page ---------------- */
function AtlasCover({ lang, setLang }) {
  const A = window.ATLAS, C = A.cover, M = A.meta;
  const featured = C.featuredSlugs.map((s) => A.docs.find((d) => d.slug === s));
  return (
    <div className="cover" data-screen-label="Case study cover">
      <header className="cover-top">
        <Crumbs lang={lang} />
        <LangToggle lang={lang} setLang={setLang} />
      </header>

      {/* hero */}
      <section className="cover-hero">
        <div className="grid-bg"></div>
        <div className="cover-hero-inner">
          <div className="hello">
            <span className="dot"></span>
            <span className="kicker">{AL(C.kicker, lang)}</span>
          </div>
          <h1 className="cover-title">Atlas FMCN</h1>
          <p className="cover-sub mono">{AL(M.sub, lang)}</p>
          <p className="cover-blurb">{AL(C.blurb, lang)}</p>
          <div className="chips" style={{ marginTop: 26 }}>
            {C.chips.map((c) => <span className="chip mono" key={c}>{c}</span>)}
          </div>
          <div className="hero-cta">
            <a className="btn" href={docHref(A.docs[0].slug)}>{AL(C.cta1, lang)} →</a>
            <a className="ghost mono" href="#demo">{AL(C.cta2, lang)}</a>
          </div>
        </div>
        <dl className="meta-strip mono">
          <div><dt>{lang === "es" ? "rol" : "role"}</dt><dd>{AL(M.role, lang)}</dd></div>
          <div><dt>{lang === "es" ? "cliente" : "client"}</dt><dd>{AL(M.client, lang)}</dd></div>
          <div><dt>{lang === "es" ? "periodo" : "period"}</dt><dd>{M.year}</dd></div>
          <div><dt>{lang === "es" ? "entregable" : "deliverable"}</dt><dd>{AL(M.deliverable, lang)}</dd></div>
        </dl>
      </section>

      {/* brief */}
      <section className="cover-sec">
        <SectionHead no="/ 01" title={AL(C.panelsTitle, lang)} />
        <div className="exp-cards">
          {C.panels.map((p) => (
            <article className="exp-card" key={p.no}>
              <div className="exp-no mono">{p.no}</div>
              <h3>{AL(p.title, lang)}</h3>
              <p>{AL(p.body, lang)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* demo */}
      <section className="cover-sec" id="demo">
        <SectionHead no="/ 02" title={AL(C.demoTitle, lang)} intro={AL(C.demoIntro, lang)} />
        <div className="demo-frame">
          <div className="dp-bar">
            <i></i><i></i><i></i>
            <span className="mono">{C.demoBar}</span>
            <a className="demo-open mono" href="../mapa_impacto_fmcn.html" target="_blank" rel="noopener">{AL(C.demoOpen, lang)} ↗</a>
          </div>
          <iframe className="demo-iframe" src="../mapa_impacto_fmcn.html" title="Atlas FMCN — prototipo interactivo" loading="lazy"></iframe>
        </div>
      </section>

      {/* featured entries */}
      <section className="cover-sec">
        <SectionHead no="/ 03" title={AL(C.linksTitle, lang)} intro={AL(C.linksIntro, lang)} />
        <div className="work-grid">
          {featured.map((d) => (
            <a className="work-card" key={d.slug} href={docHref(d.slug)}>
              <div className="work-card-top">
                <span className="work-cat mono">{AL(window.ATLAS.groups.find((g) => g.id === d.group).label, lang)}</span>
                <span className="work-arrow mono">↗</span>
              </div>
              <h4>{AL(d.title, lang)}</h4>
              <p>{AL(d.desc, lang)}</p>
              <span className="work-cta mono">{AL(C.openDoc, lang)}</span>
            </a>
          ))}
        </div>
      </section>

      {/* full index */}
      <section className="cover-sec">
        <SectionHead no="/ 04" title={AL(C.indexTitle, lang)} intro={AL(C.indexIntro, lang)} />
        {window.ATLAS.groups.map((g) => (
          <div className="idx-group" key={g.id}>
            <h4 className="col-head mono">{AL(g.label, lang)}</h4>
            <ul className="idx-list">
              {window.ATLAS.docs.filter((d) => d.group === g.id).map((d) => (
                <li key={d.slug}>
                  <a className="idx-row" href={docHref(d.slug)}>
                    <span className="idx-file mono">{d.file}</span>
                    <span className="idx-title">{AL(d.title, lang)}</span>
                    <span className="idx-desc">{AL(d.desc, lang)}</span>
                    <span className="work-arrow mono">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <footer className="cover-foot mono">
        <a href="../index.html">{AL(window.ATLAS.ui.backToPortfolio, lang)}</a>
        <span>© 2026 Miguel Angel Salamanca</span>
      </footer>
    </div>
  );
}

/* ---------------- Language toggle (portfolio style) ---------------- */
function LangToggle({ lang, setLang }) {
  return (
    <button className="lang-toggle mono" onClick={() => setLang(lang === "en" ? "es" : "en")} aria-label="Toggle language">
      <span className={lang === "en" ? "on" : ""}>EN</span>
      <span className={lang === "es" ? "on" : ""}>ES</span>
    </button>
  );
}

/* ---------------- Docs sidebar ---------------- */
function DocsSidebar({ lang, setLang, current }) {
  const A = window.ATLAS;
  return (
    <aside className="docs-side">
      <div className="docs-side-top">
        <a className="brand" href="#/">
          <div className="mark">MS</div>
          <div className="brand-name mono">ATLAS FMCN<br />{AL(A.ui.docs, lang).toUpperCase()}</div>
        </a>
        <a className="navlink mono docs-back" href="#/">{AL(A.ui.backToCover, lang)}</a>
      </div>
      <nav className="docs-toc" aria-label="Tabla de contenidos">
        {A.groups.map((g) => (
          <div className="toc-group" key={g.id}>
            <span className="toc-label mono">{AL(g.label, lang)}</span>
            {A.docs.filter((d) => d.group === g.id).map((d) => (
              <a key={d.slug}
                 href={docHref(d.slug)}
                 className={"navlink toc-link" + (current === d.slug ? " active" : "")}>
                {AL(d.title, lang)}
              </a>
            ))}
          </div>
        ))}
      </nav>
      <div className="side-foot mono">
        <LangToggle lang={lang} setLang={setLang} />
        <div className="side-copy">© 2026<br />Miguel Angel Salamanca</div>
      </div>
    </aside>
  );
}

/* ---------------- Markdown body ---------------- */
function MarkdownBody({ md, lang }) {
  const ref = useRef(null);
  const A = window.ATLAS;
  useEffect(() => {
    if (!ref.current) return;
    // copy buttons on code blocks
    ref.current.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-btn mono";
      btn.type = "button";
      btn.textContent = AL(A.ui.copy, lang);
      btn.addEventListener("click", () => {
        copyText(pre.innerText.replace(AL(A.ui.copy, lang), "").trim(), () => {
          btn.textContent = AL(A.ui.copied, lang);
          setTimeout(() => { btn.textContent = AL(A.ui.copy, lang); }, 1600);
        });
      });
      pre.appendChild(btn);
    });
  }, [md, lang]);
  const html = window.marked ? window.marked.parse(md, { gfm: true, breaks: false }) : md;
  return <div className="md-body" ref={ref} dangerouslySetInnerHTML={{ __html: html }}></div>;
}

/* ---------------- Prompt body (preformatted + copy-all) ---------------- */
function PromptBody({ text, lang }) {
  const A = window.ATLAS;
  const [copied, setCopied] = useState(false);
  return (
    <div className="prompt-wrap">
      <p className="prompt-note">{AL(A.ui.promptNote, lang)}</p>
      <div className="prompt-block">
        <button className="copy-btn copy-all mono" type="button"
          onClick={() => copyText(text, () => { setCopied(true); setTimeout(() => setCopied(false), 1600); })}>
          {copied ? AL(A.ui.copied, lang) : AL(A.ui.copyAll, lang)}
        </button>
        <pre className="prompt-pre mono">{text}</pre>
      </div>
    </div>
  );
}

/* ---------------- Doc page ---------------- */
function DocPage({ slug, lang, setLang }) {
  const A = window.ATLAS;
  const idx = A.docs.findIndex((d) => d.slug === slug);
  const doc = A.docs[idx];
  const body = window.ATLAS_DOCS_BODIES[slug] || "*(sin contenido)*";
  const prev = idx > 0 ? A.docs[idx - 1] : null;
  const next = idx < A.docs.length - 1 ? A.docs[idx + 1] : null;
  const group = A.groups.find((g) => g.id === doc.group);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  return (
    <div className="docs-layout" data-screen-label={"Doc: " + slug}>
      <DocsSidebar lang={lang} setLang={setLang} current={slug} />
      <main className="docs-main">
        <header className="docs-head">
          <Crumbs lang={lang} doc={doc} />
          <span className="kicker" style={{ display: "block", marginTop: 38 }}>{AL(group.label, lang)}</span>
          <h1 className="doc-title">{AL(doc.title, lang)}</h1>
          <div className="doc-meta mono">
            <span>{AL(A.ui.sourceFile, lang)}: {doc.file}</span>
            {lang === "en" ? <span className="doc-dot">·</span> : null}
            {lang === "en" ? <span>{AL(A.ui.onThisSite, lang)}</span> : null}
          </div>
        </header>

        {doc.prompt
          ? <PromptBody text={body} lang={lang} />
          : <MarkdownBody md={body} lang={lang} />}

        <nav className="doc-pager" aria-label="Documentos anterior y siguiente">
          {prev ? (
            <a className="pager-card" href={docHref(prev.slug)}>
              <span className="pager-dir mono">← {AL(A.ui.prev, lang)}</span>
              <span className="pager-title">{AL(prev.title, lang)}</span>
            </a>
          ) : <span></span>}
          {next ? (
            <a className="pager-card pager-next" href={docHref(next.slug)}>
              <span className="pager-dir mono">{AL(A.ui.next, lang)} →</span>
              <span className="pager-title">{AL(next.title, lang)}</span>
            </a>
          ) : <span></span>}
        </nav>
      </main>
    </div>
  );
}

/* ---------------- shared section header (cover) ---------------- */
function SectionHead({ no, title, intro }) {
  return (
    <div className="sec-head">
      <span className="sec-no mono">{no}</span>
      <h2 className="sec-title">{title}</h2>
      {intro ? <p className="sec-intro">{intro}</p> : null}
    </div>
  );
}

Object.assign(window, { AtlasCover, DocPage, DocsSidebar, MarkdownBody, PromptBody, LangToggle, Crumbs, AL });

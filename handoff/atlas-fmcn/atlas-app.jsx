/* ====================================================================
   atlas-app.jsx — hash router + language state for the Atlas FMCN
   case study. Routes: "#/" cover · "#/doc/<slug>" doc page.
   Shares the portfolio's language key ("mas-lang").
   ==================================================================== */
function parseRoute() {
  const h = window.location.hash || "#/";
  const m = h.match(/^#\/doc\/([a-z0-9-]+)/);
  return m ? { page: "doc", slug: m[1] } : { page: "cover" };
}

function AtlasApp() {
  const [lang, setLangState] = React.useState(() => localStorage.getItem("mas-lang") || "es");
  const [route, setRoute] = React.useState(parseRoute);

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem("mas-lang", l);
    document.documentElement.lang = l;
  };

  React.useEffect(() => {
    document.documentElement.lang = lang;
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    const A = window.ATLAS;
    if (route.page === "doc") {
      const doc = A.docs.find((d) => d.slug === route.slug);
      document.title = (doc ? AL(doc.title, lang) + " — " : "") + "Atlas FMCN · Miguel Angel Salamanca";
    } else {
      document.title = "Atlas FMCN — Case Study · Miguel Angel Salamanca";
    }
  }, [route, lang]);

  if (route.page === "doc" && window.ATLAS.docs.some((d) => d.slug === route.slug)) {
    return <DocPage slug={route.slug} lang={lang} setLang={setLang} />;
  }
  return <AtlasCover lang={lang} setLang={setLang} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<AtlasApp />);

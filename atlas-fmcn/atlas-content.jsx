/* ====================================================================
   atlas-content.jsx — runtime loader for the doc bodies.
   Source markdown lives in /FMCN/*.md (sibling of atlas-fmcn/, served
   as a static asset). Fetched on demand and cached by filename.
   ==================================================================== */

const ATLAS_DOCS_CACHE = {};

function loadDocBody(file) {
  if (!ATLAS_DOCS_CACHE[file]) {
    ATLAS_DOCS_CACHE[file] = fetch("../FMCN/" + encodeURIComponent(file)).then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status + " — " + file);
      return res.text();
    });
  }
  return ATLAS_DOCS_CACHE[file];
}

window.loadDocBody = loadDocBody;

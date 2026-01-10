(function () {
  const MERMAID_URL =
    "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

  function injectStyleOnce() {
    // Add small CSS tweaks (optional)
    const id = "mermaid-local-style";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      /* Allow horizontal scroll for large diagrams */
      pre.mermaid {
        overflow-x: auto;
        padding: 0;
        margin: 1em 0;
        background: transparent;
      }
      /* Keep diagrams within the page width */
      .mermaid {
        max-width: 100%;
      }
    `;
    document.head.appendChild(style);
  }

  async function loadAndRender() {
    // Skip if there is no diagram
    const blocks = document.querySelectorAll("pre.mermaid, .mermaid");
    if (!blocks.length) return;

    injectStyleOnce();

    // Load Mermaid (ES module)
    const { default: mermaid } = await import(MERMAID_URL);

    // Basic config
    mermaid.initialize({
      startOnLoad: false, // We will run it manually
      theme: "default",
      securityLevel: "strict",
    });

    // Render diagrams
    await mermaid.run({
      querySelector: "pre.mermaid, .mermaid",
    });
  }

  // Run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadAndRender);
  } else {
    loadAndRender();
  }
})();

document.addEventListener("DOMContentLoaded", async () => {
  const sections = [
    "introduction.html",
    "project_overview.html",
    "research.html",
    "architecture.html",
    "ux_process.html",
    "final_design.html",
    "results.html",
    "reflection.html",
  ];

  const content = document.getElementById("content");

  // Alle Seiten aus dem `pages`-Ordner laden und in den Hauptcontainer einfügen
  for (const section of sections) {
    try {
      const response = await fetch(`pages/${section}`);
      if (!response.ok) throw new Error(`Seite ${section} konnte nicht geladen werden.`);
      const html = await response.text();

      // Wrapper für jede geladene Section
      const sectionDiv = document.createElement("div");
      sectionDiv.id = section.replace(".html", ""); // ID basierend auf Dateinamen
      sectionDiv.innerHTML = html;
      content.appendChild(sectionDiv);
    } catch (error) {
      console.error(`Fehler beim Laden von ${section}:`, error.message);
    }
  }

  // Scrollverhalten mit Offset
  document.querySelectorAll("header .navigation a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Standard-Verhalten unterbinden
      const targetId = link.getAttribute("data-page");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const offsetTop = targetSection.offsetTop - headerHeight - 10; // Berücksichtige Header-Höhe und zusätzlichen Abstand
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

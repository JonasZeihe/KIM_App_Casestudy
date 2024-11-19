document.addEventListener("DOMContentLoaded", async () => {
  const sections = [
    "introduction.html",
    "project_overview.html",
    "research.html",
    "architecture.html",
    "ux_process.html",
    "final_design.html",
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

  // Hamburger Menu Toggle
  const burgerMenu = document.querySelector(".burger-menu");
  const navigation = document.querySelector(".navigation ul");

  if (burgerMenu && navigation) {
    burgerMenu.addEventListener("click", () => {
      navigation.classList.toggle("active");
    });
  } else {
    console.error("Burger menu or navigation not found.");
  }

  // Carousel-Setup
  const carouselTrack = document.querySelector(".carousel-track");

  if (carouselTrack) {
    // Dynamisch Bilder aus dem Ordner laden
    const appScreens = [];

    try {
      const response = await fetch("assets/images/App Screens/");
      if (!response.ok) throw new Error("Fehler beim Abrufen des Verzeichnisses.");
    
      // Textinhalt des Verzeichnisses verarbeiten (Simulation für serverseitige Verzeichnisauflistung)
      const text = await response.text();
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(text, "text/html");
      const links = htmlDocument.querySelectorAll("a");
    
      // Füge alle PNG-Bilder aus dem Verzeichnis zur Liste hinzu
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href.endsWith(".png") || href.endsWith(".jpg") || href.endsWith(".jpeg")) {
          appScreens.push(`assets/images/App Screens/${href}`);
        }
      });
    } catch (error) {
      console.error("Fehler beim Laden der Screens:", error.message);
    }
    

    // Slides für jede App-Screen-Datei erstellen
    appScreens.forEach((src) => {
      const slide = document.createElement("div");
      slide.classList.add("carousel-slide");

      const img = document.createElement("img");
      img.src = src;
      img.alt = "App Screen";

      slide.appendChild(img);
      carouselTrack.appendChild(slide);
    });

    // Carousel-Funktionalität aktivieren
    initializeCarousel();
  }

  function initializeCarousel() {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextButton = document.querySelector(".carousel-button.next");
    const prevButton = document.querySelector(".carousel-button.prev");

    let currentIndex = 0;

    const updateCarousel = () => {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    // Initial Carousel-Setup
    updateCarousel();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const navigation = document.querySelector(".navigation ul");
    const navLinks = document.querySelectorAll(".navigation a");
    let lastScrollTop = 0; // Speichert die letzte Scrollposition
    const header = document.querySelector("header");
  
    // Burger-Menü Toggle
    burgerMenu.addEventListener("click", () => {
      navigation.classList.toggle("active");
    });
  
    // Header schließt bei Klick auf einen Link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("active");
      });
    });
  
    // Header verschwindet beim Scrollen nach unten und taucht wieder auf
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
      if (scrollTop > lastScrollTop) {
        // Scrollt nach unten
        header.style.top = "-100px"; // Versteckt den Header
      } else {
        // Scrollt nach oben
        header.style.top = "0"; // Zeigt den Header
      }
  
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Speichert die aktuelle Scrollposition
    });
  });
  
});

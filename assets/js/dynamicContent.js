document.addEventListener("DOMContentLoaded", async () => {
  // Dynamisch zu ladende Abschnitte
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

  // Lade HTML-Seiten und füge sie in den Hauptcontainer ein
  for (const section of sections) {
    try {
      const response = await fetch(`pages/${section}`);
      if (!response.ok) throw new Error(`Seite ${section} konnte nicht geladen werden.`);
      const html = await response.text();

      const sectionDiv = document.createElement("div");
      sectionDiv.id = section.replace(".html", ""); // ID aus Dateinamen ableiten
      sectionDiv.innerHTML = html;
      content.appendChild(sectionDiv);
    } catch (error) {
      console.error(`Fehler beim Laden von ${section}:`, error.message);
    }
  }

  // Scrollverhalten mit Offset für Navigation
  document.querySelectorAll("header .navigation a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-page");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const offsetTop = targetSection.offsetTop - headerHeight - 10;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });

  // Hamburger Menü Toggle
  const burgerMenu = document.querySelector(".burger-menu");
  const navigation = document.querySelector(".navigation ul");

  if (burgerMenu && navigation) {
    burgerMenu.addEventListener("click", () => {
      navigation.classList.toggle("active");
    });
  } else {
    console.error("Burger menu or navigation not found.");
  }

  // Carousel-Funktionalität
  const carouselTrack = document.querySelector(".carousel-track");

  if (carouselTrack) {
    initializeCarousel(carouselTrack);
  }

  // Funktion für Carousel-Setup
  function initializeCarousel(track) {
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

    // Initialisiere Carousel
    updateCarousel();
  }

  // Header Scroll Hide/Show
  const header = document.querySelector("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      header.style.top = "-100px"; // Versteckt den Header
    } else {
      header.style.top = "0"; // Zeigt den Header
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});

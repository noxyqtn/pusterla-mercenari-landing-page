/* ============================================================
   Pusterla Mercenari GmbH — Landing Page JavaScript
   ============================================================ */

(function () {
  "use strict";

  // ---------- Mobile Menü (Hamburger) ----------
  const toggle = document.getElementById("headerToggle");
  const nav = document.getElementById("headerNav");
  const body = document.body;

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("open");
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(!isOpen));
      body.style.overflow = isOpen ? "" : "hidden";
    });

    // Menü schließen beim Klick auf einen Link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      });
    });
  }

  // ---------- Header bei Scroll leicht abdunkeln ----------
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.style.background = "rgba(11, 11, 15, 0.9)";
        header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.12)";
      } else {
        header.style.background = "rgba(11, 11, 15, 0.7)";
        header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.08)";
      }
    });
  }

  // ---------- Fade-in beim Scrollen (Intersection Observer) ----------
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  // ---------- Sanftes Scrollen für Ankertitel (Header-Offset) ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          const headerOffset = header ? header.offsetHeight : 72;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 16;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // ---------- Telefonnummer formatiert kopieren-freundlich ----------
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // tel:-Links öffnen die Telefon-App – nichts weiter nötig
    });
  });

})();

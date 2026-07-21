const header = document.getElementById("siteHeader");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.getElementById("mainNav");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("open", !isOpen);
  document.body.style.overflow = !isOpen ? "hidden" : "";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
    document.body.style.overflow = "";
  });
});


const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}


// V22 recruitment popup
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("recruitPopup");
  if (!popup) return;

  const storageKey = "lartifeRecruitPopupHiddenUntil";
  const hiddenUntil = Number(localStorage.getItem(storageKey) || 0);
  const now = Date.now();

  function openPopup() {
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
    document.body.classList.add("popup-open");
  }

  function closePopup() {
    const hideToday = document.getElementById("hideRecruitPopupToday");
    if (hideToday && hideToday.checked) {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      localStorage.setItem(storageKey, String(tomorrow.getTime()));
    }

    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("popup-open");
  }

  if (hiddenUntil <= now) {
    setTimeout(openPopup, 650);
  }

  popup.querySelectorAll("[data-popup-close]").forEach(function (el) {
    el.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && popup.classList.contains("is-open")) {
      closePopup();
    }
  });
});

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

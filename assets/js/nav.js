document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const closeText = document.getElementById("menuCloseText");
  if (!toggle || !nav) return;

  const icon = toggle.querySelector(".menu-icon");

  function openMenu() {
    nav.classList.add("open");
    if (icon) icon.textContent = "✕";
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    nav.classList.remove("open");
    if (icon) icon.textContent = "☰";
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", () => {
    nav.classList.contains("open") ? closeMenu() : openMenu();
  });

  if (closeText) closeText.addEventListener("click", closeMenu);
  nav.querySelectorAll(".nav-btn").forEach((a) => a.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});

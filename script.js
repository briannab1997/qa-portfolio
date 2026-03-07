/* MOBILE MENU */
function toggleMenu() {
  const links = document.querySelector(".nav-links");
  links.classList.toggle("open");
}

/* DARK MODE */
const toggle = document.getElementById("themeToggle");
const body = document.body;

function applyDarkMode(isDark) {
  body.classList.toggle("dark", isDark);
  toggle.textContent = isDark ? "☀️" : "🌙";
}

applyDarkMode(localStorage.getItem("darkMode") === "true");

toggle.addEventListener("click", () => {
  const isDark = body.classList.contains("dark");
  applyDarkMode(!isDark);
  localStorage.setItem("darkMode", !isDark);
});

/* SCROLL PROGRESS BAR */
const scrollBar = document.getElementById("scrollBar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;

  scrollBar.style.width = scrolled + "%";
});

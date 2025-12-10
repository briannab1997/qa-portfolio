/* MOBILE MENU */
function toggleMenu() {
  const links = document.querySelector(".nav-links");
  links.classList.toggle("open");
}

/* DARK MODE */
const toggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("darkMode", body.classList.contains("dark"));
});

/* SCROLL PROGRESS BAR */
const scrollBar = document.getElementById("scrollBar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;

  scrollBar.style.width = scrolled + "%";
});

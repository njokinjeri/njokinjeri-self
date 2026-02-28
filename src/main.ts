import './ui/clock.ts';
import './ui/uptime.ts';

const themeToggle = document.getElementById("theme-toggle") as HTMLButtonElement;
const themeIcon = document.getElementById("theme-icon") as HTMLImageElement;

const prefersDark = window.matchMedia("(prefers-color-scheme: dark").matches;
document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
themeIcon.src = prefersDark ? "./src/assets/moon-icon.svg" : "./src/assets/sun-icon.svg";

themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    themeIcon.src = next === "dark" ? "./src/assets/moon-icon.svg" : "./src/assets/sun-icon.svg";
})
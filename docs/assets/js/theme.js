function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    let element = document.getElementById("smallNav");
    if(themeName === "theme-light") element.classList.add("darkSmallNav");
    else element.classList.remove("darkSmallNav");
    document.documentElement.className = themeName;

}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-light');
    else setTheme('theme-dark');
}

(function () {
    if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-dark');
    else setTheme('theme-light');
})();

const togl = document.getElementById('switch');

togl.addEventListener('change', () => {
  toggleTheme();
});
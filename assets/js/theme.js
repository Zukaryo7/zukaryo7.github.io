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
    if (localStorage.getItem('theme') === 'theme-light') setTheme('theme-light');
    else setTheme('theme-dark');
})();

const togl = document.getElementById('switch');

togl.addEventListener('change', () => {
    toggleTheme();
});
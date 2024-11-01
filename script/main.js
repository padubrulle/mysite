const body = document.querySelector('body');
const themeSelector = document.querySelector('#theme');

function setTheme(theme) {
    body.classList.remove('light', 'dark', 'retrowave');
    body.classList.add(theme);
}

themeSelector.addEventListener('change', (event) => {
    setTheme(event.target.value);
});
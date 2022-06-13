const body = document.querySelector('body');
const toggle = document.querySelector('.theme-switch__toggle');
const footerDarktheme = document.querySelector('.footer');
const wrapper = document.querySelector('.main-wrapper');

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};

body.classList.add(Theme.LIGHT);

if (localStorage.getItem('theme')) {
    toggle.setAttribute('checked', true);
    body.classList.add(Theme.DARK);
    footerDarktheme?.classList.add(Theme.DARK);
}

const onChange = () => {
    body.classList.toggle(Theme.DARK);
    footerDarktheme?.classList.toggle(Theme.DARK);
    wrapper?.classList.toggle(Theme.DARK);
    if (body.classList.contains(Theme.DARK)) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.removeItem('theme');
    }
};

toggle?.addEventListener('change', onChange);

import { body, toggle, footerDarktheme } from './change-theme';

const theme = localStorage.getItem('theme');

toggle.addEventListener('change', event => {
    localStorage.setItem('theme', body.classList);
});

function updataTheme() {
    if (theme) {
        body.classList = theme;
    }
}

function checkboxChecked() {
    if (theme === 'dark-theme') {
        toggle.setAttribute('checked', true);
    }
}

function footerTheme() {
    if (theme === 'dark-theme') {
        footerDarktheme.classList.add('dark-theme');
    }
}

updataTheme();
checkboxChecked();
footerTheme();
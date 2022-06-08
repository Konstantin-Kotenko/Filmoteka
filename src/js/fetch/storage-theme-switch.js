import { body, toggle, footerDarktheme } from './change-theme';

const savedTheme = localStorage.getItem('theme');

toggle.addEventListener('change', event => {
    localStorage.setItem('theme', body.classList);
});

function updataTheme() {
    if (savedTheme) {
        body.classList = savedTheme;
    }
}

function checkboxChecked() {
    if (savedTheme === 'dark-theme') {
        toggle.setAttribute('checked', true);
    }
}

function footerTheme() {
    if (savedTheme === 'dark-theme') {
        footerDarktheme.classList.add('dark-theme');
    }
}

updataTheme();
checkboxChecked();
footerTheme();
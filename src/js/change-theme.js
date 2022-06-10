const body = document.querySelector('body');
const toggle = document.querySelector('.theme-switch__toggle');
const footerDarktheme = document.querySelector('.footer');

toggle.addEventListener('change', event => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        body.classList.add('theme-switch__icon--accent2');
        footerDarktheme.classList.remove('dark-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.remove('theme-switch__icon--accent1');
        body.classList.add('theme-switch__icon--accent2');
        body.classList.add('dark-theme');
        footerDarktheme.classList.add('dark-theme');
    }
});


export { body, toggle, footerDarktheme };


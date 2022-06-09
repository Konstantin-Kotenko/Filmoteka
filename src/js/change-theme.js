const body = document.querySelector('body');
const toggle = document.querySelector('.theme-switch__toggle');
const footerDarktheme = document.querySelector('.footer');

toggle.addEventListener('change', event => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        footerDarktheme.classList.remove('dark-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        footerDarktheme.classList.add('dark-theme');
    }
});


export { body, toggle, footerDarktheme };
import { refs } from '../refs/refs';

const theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

refs.theme.body.classList.add(theme.LIGHT);

if (localStorage.getItem('theme')) {
  refs.theme.toggle.setAttribute('checked', true);
  refs.theme.body.classList.add(theme.DARK);
  refs.theme.footerDarktheme?.classList.add(theme.DARK);
  refs.theme.wrapper?.classList.add(theme.DARK);
}

const onChange = () => {
  refs.theme.body.classList.toggle(theme.DARK);
  refs.theme.footerDarktheme?.classList.toggle(theme.DARK);
  refs.theme.wrapper?.classList.toggle(theme.DARK);
  if (refs.theme.body.classList.contains(theme.DARK)) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
};

refs.theme.toggle?.addEventListener('change', onChange);

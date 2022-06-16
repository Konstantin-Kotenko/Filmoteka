import { refs } from './refs/refs';

refs.scroll.scrolltop.classList.add('scrolltop');
refs.scroll.scrolltop.innerHTML =
  '<span class="scroll-top__btn scroll-top__btn--up"></span>';
refs.theme.body.append(refs.scroll.scrolltop);

export const toggleBtnAction = () => {
  const scrollTotal =
    refs.scroll.rootElement.scrollHeight - refs.scroll.rootElement.clientHeight;
  if (refs.scroll.rootElement.scrollTop / scrollTotal > 0) {
    refs.scroll.scrolltop.classList.add('showBtn');
  } else {
    refs.scroll.scrolltop.classList.remove('showBtn');
  }
};
window.addEventListener('scroll', toggleBtnAction);

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
refs.scroll.scrolltop.addEventListener('click', scrollToTop);

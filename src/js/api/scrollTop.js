const rootElement = document.documentElement;
const body = document.querySelector('body');
const scrolltop = document.createElement('a');
scrolltop.classList.add('scrolltop');
scrolltop.innerHTML = '<span class="scroll-top__btn scroll-top__btn--up"></span>';
body.append(scrolltop);

 export const toggleBtnAction = () => {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0) {
    scrolltop.classList.add("showBtn");
  } else {
    scrolltop.classList.remove("showBtn");
  }
  };
  window.addEventListener('scroll', toggleBtnAction);
  
  export const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  scrolltop.addEventListener("click", scrollToTop);
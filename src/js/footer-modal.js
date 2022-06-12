import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.min.css';

const refs = {
  openBtn: document.querySelector('.js-open-modal'),
  backdrop: document.querySelector('.backdrop'),
};

const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },
  slideToClickedSlide: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  grabCursor: true,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
});

const openModal = () => {
  refs.backdrop.classList.remove('is-hidden');
};
const closeModal = evt => {
  if (evt.target === evt.currentTarget) {
    refs.backdrop.classList.add('is-hidden');
  }
};
refs.openBtn?.addEventListener('click', openModal);
refs.backdrop?.addEventListener('click', closeModal);

import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.min.css';
import { refs } from './refs/refs';

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
  refs.footer.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', pressEsc);
};
const closeModal = evt => {
  if (evt.target === evt.currentTarget) {
    refs.footer.backdrop.classList.add('is-hidden');
  }
};
const pressEsc = evt => {
  if (evt.code === 'Escape') {
    refs.footer.backdrop.classList.add('is-hidden');
  }
};

refs.footer.openBtn?.addEventListener('click', openModal);
refs.footer.backdrop?.addEventListener('click', closeModal);

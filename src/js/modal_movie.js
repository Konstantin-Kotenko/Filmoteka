import cardModalMovieTemplate from '../template/modalMovie.hbs';
import { BASE_URL, API_KEY } from './api/api';

const modalRefs = {
  lightbox: document.querySelector('.modal-movie-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlayModal: document.querySelector('.modal-movie-overlay'),
  galleryMovie: document.querySelector('.gallery'),
  mainContainer: document.querySelector('.main__container'),
};

function pressEsc(evt) {
  if (
    modalRefs.lightbox.classList.contains('modal-is-open') &&
    evt.code === 'Escape'
  ) {
    closeModal();
  }
}

function onOverlayClick(evt) {
  if (evt.target.closest('.modal-movie-wrapper')) {
    return;
  }
  closeModal();
}

function openModal() {
  modalRefs.lightbox.classList.add('modal-is-open');
  // modalRefs.mainContainer.style.overflow = 'hidden';
  window.addEventListener('keydown', pressEsc);
  modalRefs.closeModalBtn.addEventListener('click', closeModal);
  modalRefs.overlayModal.addEventListener('click', onOverlayClick);
  
  }



function closeModal() {
  modalRefs.lightbox.classList.remove('modal-is-open');
  window.removeEventListener('keydown', pressEsc);
  modalRefs.closeModalBtn.removeEventListener('click', closeModal);
  modalRefs.overlayModal.removeEventListener('click', onOverlayClick);
  modalRefs.overlayModal.innerHTML = '';
}

async function fetchMovie(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  console.log('object :>> ', url);
  const response = await fetch(url);
  return await response.json();
}

async function showMovieCard(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  openModal();
  const movieId = event.target.id;
  const data = await fetchMovie(movieId);
  modalRefs.overlayModal.innerHTML = cardModalMovieTemplate(data);
}

modalRefs.galleryMovie.addEventListener('click', showMovieCard);

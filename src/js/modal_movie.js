import cardModalMovieTemplate from '../template/modalMovie.hbs';
import { BASE_URL, API_KEY } from './api/api';
import { getFromStorage, addToStorage } from './storage';
import { renderTrailer } from './fetch/fetchTrailer';
import { requestForWatched } from './watched';
import { requestForQueue } from './queue';

const modalRefs = {
  lightbox: document.querySelector('.modal-movie-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlayModal: document.querySelector('.modal-movie-overlay'),
  galleryMovie: document.querySelector('.gallery'),
  galleryMovieLibrary: document.querySelector('.gallery--library'),
  mainContainer: document.querySelector('.main__container'),
  body: document.querySelector('body'),
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
  modalRefs.body.classList.add('overflowModal');
  window.addEventListener('keydown', pressEsc);
  modalRefs.closeModalBtn.addEventListener('click', closeModal);
  modalRefs.overlayModal.addEventListener('click', onOverlayClick);
}

function closeModal() {
  modalRefs.lightbox.classList.remove('modal-is-open');
  window.removeEventListener('keydown', pressEsc);
  modalRefs.closeModalBtn.removeEventListener('click', closeModal);
  modalRefs.body.classList.remove('overflowModal');
  modalRefs.overlayModal.removeEventListener('click', onOverlayClick);
  modalRefs.overlayModal.innerHTML = '';
}

export async function fetchMovie(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const response = await fetch(url);
  return await response.json();
}

modalRefs.galleryMovie?.addEventListener('click', showMovieCard);
modalRefs.galleryMovieLibrary?.addEventListener('click', showMovieCard);
let id;
async function showMovieCard(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  openModal();

  id = event.target.id;
  const data = await fetchMovie(id);
  modalRefs.overlayModal.innerHTML = cardModalMovieTemplate(data);

  trailerBtn = document.querySelector('.buttonYouTubeTrailer');
  trailerBtn?.addEventListener('click', renderTrailer);

  const watchedBtn = document.querySelector('.modal-watched-button');
  const queueBtn = document.querySelector('.modal-queue-button');

  monitorBtnChange();
  watchedBtn.addEventListener('click', handleBtnWatched);
  queueBtn.addEventListener('click', handleBtnQueue);

  function handleBtnWatched() {
    toggleToWatched(id);
  }

  function handleBtnQueue() {
    toggleToQueue(id);
  }

  function toggleToWatched() {
    let filmsWatched = [];
    let localStorageData = getFromStorage('filmsWatched');
    if (localStorageData) {
      filmsWatched = localStorageData;
    }
    let currentIdFilm = id;
    const index = filmsWatched.indexOf(currentIdFilm);
    if (index > -1) {
      filmsWatched.splice(index, 1);
    } else filmsWatched.push(id);
    addToStorage('filmsWatched', filmsWatched);
    requestForWatched();
    monitorBtnChange();
  }

  function toggleToQueue() {
    let filmsQueue = [];
    let localStorageData = getFromStorage('filmsQueue');
    if (localStorageData) {
      filmsQueue = localStorageData;
    }
    let currentIdFilm = id;
    const index = filmsQueue.indexOf(currentIdFilm);
    if (index > -1) {
      filmsQueue.splice(index, 1);
    } else filmsQueue.push(id);
    addToStorage('filmsQueue', filmsQueue);
    requestForQueue();
    monitorBtnChange();
  }

  function monitorBtnChange() {
    let filmsWatched = [];
    let localStorageData = getFromStorage('filmsWatched');
    if (localStorageData) {
      filmsWatched = localStorageData;
    }
    let currentIdFilm = id;
    let filmId = filmsWatched.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      watchedBtn.textContent = 'Delete from watched';
      watchedBtn.classList.add('active');
    } else {
      watchedBtn.textContent = 'Add to watched';
      watchedBtn.classList.remove('active');
    }

    let filmsQueue = [];
    localStorageData = getFromStorage('filmsQueue');
    if (localStorageData) {
      filmsQueue = localStorageData;
    }

    filmId = filmsQueue.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      queueBtn.textContent = 'Delete from Queue';
      queueBtn.classList.add('active');
    } else {
      queueBtn.textContent = 'Add to Queue';
      queueBtn.classList.remove('active');
    }
  }
}

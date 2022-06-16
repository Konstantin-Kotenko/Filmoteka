import cardModalMovieTemplate from '../template/modalMovie.hbs';
import { getFromStorage, addToStorage } from './localStorage/storage';
import { renderTrailer } from './render/video-trailer';
import { requestForWatched } from './localStorage/watched';
import { requestForQueue } from './localStorage/queue';
import { dynamicRefs } from './refs/dynamicRefs';
import { getDataFilms } from '/src/api/getDataFilms';
import { refs } from './refs/refs';

function pressEsc(evt) {
  if (
    refs.modalRefs.lightbox.classList.contains('modal-is-open') &&
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
  refs.modalRefs.lightbox.classList.add('modal-is-open');
  refs.modalRefs.body.classList.add('overflowModal');
  window.addEventListener('keydown', pressEsc);
  refs.modalRefs.closeModalBtn.addEventListener('click', closeModal);
  refs.modalRefs.overlayModal.addEventListener('click', onOverlayClick);
  e => showMovieCard(e);
}

function closeModal() {
  refs.modalRefs.lightbox.classList.remove('modal-is-open');
  window.removeEventListener('keydown', pressEsc);
  refs.modalRefs.closeModalBtn.removeEventListener('click', closeModal);
  refs.modalRefs.body.classList.remove('overflowModal');
  refs.modalRefs.overlayModal.removeEventListener('click', onOverlayClick);
  refs.modalRefs.overlayModal.innerHTML = '';
}
let id;

export async function showMovieCard(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  openModal();

  id = event.target.id;
  const { ...data } = await getDataFilms(id);
  refs.modalRefs.overlayModal.innerHTML = cardModalMovieTemplate(data);
  const liveRefs = dynamicRefs();

  monitorBtnChange();

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
    if (refs.modalRefs.galleryMovieLibrary) {
      requestForWatched();
    }
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
    if (refs.modalRefs.galleryMovieLibrary) {
      requestForQueue();
    }
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
      liveRefs.watchedBtn.textContent = 'Delete from watched';
      liveRefs.watchedBtn.classList.add('active');
    } else {
      liveRefs.watchedBtn.textContent = 'Add to watched';
      liveRefs.watchedBtn.classList.remove('active');
    }

    let filmsQueue = [];
    localStorageData = getFromStorage('filmsQueue');
    if (localStorageData) {
      filmsQueue = localStorageData;
    }

    filmId = filmsQueue.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      liveRefs.queueBtn.textContent = 'Delete from Queue';
      liveRefs.queueBtn.classList.add('active');
    } else {
      liveRefs.queueBtn.textContent = 'Add to Queue';
      liveRefs.queueBtn.classList.remove('active');
    }
  }
  liveRefs.watchedBtn?.addEventListener('click', handleBtnWatched);
  liveRefs.queueBtn?.addEventListener('click', handleBtnQueue);
  liveRefs.trailerBtn?.addEventListener('click', renderTrailer);
}

refs.modalRefs.galleryMovie?.addEventListener('click', showMovieCard);

import cardModalMovieTemplate from '../template/modalMovie.hbs';
import { BASE_URL, API_KEY } from './api/api';
import { getFromStorage, addToStorage } from './storage';
import { renderTrailer } from './fetch/fetchTrailer';
import { requestForWatched } from './watched';
import { requestForQueue } from './queue';
import {dynamicRefs} from './dynamicRefs';

const refs = dynamicRefs();

function pressEsc(evt) {
  if (
    refs.lightbox.classList.contains('modal-is-open') &&
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
  refs.lightbox.classList.add('modal-is-open');
  refs.body.classList.add('overflowModal');
  window.addEventListener('keydown', pressEsc);
  refs.closeModalBtn.addEventListener('click', closeModal);
  refs.overlayModal.addEventListener('click', onOverlayClick);
  (e) => showMovieCard(e);
}

function closeModal() {
  refs.lightbox.classList.remove('modal-is-open');
  window.removeEventListener('keydown', pressEsc);
  refs.closeModalBtn.removeEventListener('click', closeModal);
  refs.body.classList.remove('overflowModal');
  refs.overlayModal.removeEventListener('click', onOverlayClick);
  refs.overlayModal.innerHTML = '';
}
let id;
export async function fetchMovie(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const response = await fetch(url);
  return await response.json();
}

refs.galleryMovie?.addEventListener('click', showMovieCard);
refs.galleryMovieLibrary?.addEventListener('click', showMovieCard);

async function showMovieCard(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  openModal();

  id = event.target.id;
  const data = await fetchMovie(id);
  refs.overlayModal.innerHTML = cardModalMovieTemplate(data);


  refs.trailerBtn?.addEventListener('click', renderTrailer);

  monitorBtnChange();
  
  refs.watchedBtn.addEventListener('click', handleBtnWatched);
  refs.queueBtn.addEventListener('click', handleBtnQueue);

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
      refs.watchedBtn.textContent = 'Delete from watched';
      refs.watchedBtn.classList.add('active');
    } else {
      refs.watchedBtn.textContent = 'Add to watched';
      refs.watchedBtn.classList.remove('active');
    }

    let filmsQueue = [];
    localStorageData = getFromStorage('filmsQueue');
    if (localStorageData) {
      filmsQueue = localStorageData;
    }

    filmId = filmsQueue.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      refs.queueBtn.textContent = 'Delete from Queue';
      refs.queueBtn.classList.add('active');
    } else {
      refs.queueBtn.textContent = 'Add to Queue';
      refs.queueBtn.classList.remove('active');
    }
  }
}

import { getFromStorage } from './storage';
import { movieCard } from '../template/movieCard.hbs';
import { fetchMovie } from './modal_movie';

const btnWatched = document.querySelector('.btn--watched');
const libraryGallery = document.querySelector('.gallery--library');

const clearLibrary = () => (libraryGallery.innerHTML = '');

const showFilms = key => {
  clearLibrary();

  const watchedArr = getFromStorage(key);
  watchedArr.forEach(id => fetchMovie(id).then(data => renderMovie(data)));
};

const watchedBtn = () => {
  refs.watchedBtnRef.classList.add('orange');
  refs.queueBtnRef.classList.remove('orange');
};

btnWatched.addEventListener('click', () => {
  showFilms('filmsWatched');
  watchedBtn();
});

import Notiflix from 'notiflix';
import { getFromStorage } from './storage';
import oneMovieCard from '../template/oneMoviecard.hbs';
import { refs } from './refs.js';
import { showMovieCard } from './modal_movie';
import { getDataFilms } from '../api/getDataFilms';

const { libraryGallery, btnWatched, btnQueue } = refs.library;

const dataCombine = movie => {
  return {
    ...movie,
    year: movie.release_date.slice(0, 4),
  };
};

export const requestForWatched = async () => {
  libraryGallery.innerHTML = '';
  const watchedArr = getFromStorage('filmsWatched');

  if (watchedArr.length === 0) {
    Notiflix.Notify.info("You don't have watched movies");
  } else {
    watchedArr.map(id => {
      getDataFilms(id).then(result => {
        const data = result;
        const fullData = dataCombine(data);
        libraryGallery?.insertAdjacentHTML('beforeend', oneMovieCard(fullData));
      });
    });
  }
  btnWatched.classList.add('orange');
  btnQueue.classList.remove('orange');
};

btnWatched?.addEventListener('click', requestForWatched);
libraryGallery?.addEventListener('click', showMovieCard);

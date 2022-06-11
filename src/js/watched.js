import { getFromStorage } from './storage';
import { movieCard } from '../template/movieCard.hbs';
import { fetchMovie } from './modal_movie';
import { renderMovie } from './fetch/fetchByKey';

// const btnWatched = document.querySelector('.btn--watched');
// const libraryGallery = document.querySelector('.gallery--library');

// const clearLibrary = () => (libraryGallery.innerHTML = '');

// const showFilms = key => {
//   clearLibrary();

//   const watchedArr = getFromStorage(key);
//   watchedArr.forEach(id => fetchMovie(id).then(data => renderMovie(data)));
// };

// const watchedBtn = () => {
//   refs.watchedBtnRef.classList.add('orange');
//   refs.queueBtnRef.classList.remove('orange');
// };

// btnWatched.addEventListener('click', () => {
//   showFilms('filmsWatched');
//   watchedBtn();
// });

const watchedBtn = document.querySelector('.btn--watched');
const libraryGallery = document.querySelector('.gallery--library');
console.log(watchedBtn);
console.log(libraryGallery);

const watchedArr = getFromStorage('filmsWatched');
console.log(watchedArr);

const showFilms = () => {
  watchedArr.forEach(id =>
    fetchMovie(id).then(data =>
      libraryGallery.insertAdjacentHTML('beforeend', renderMovie(data))
    )
  );
};
console.log(showFilms);

watchedBtn.addEventListener('click', showFilms);

import { getFromStorage } from './storage';
import movieCard from '../template/movieCard.hbs';
import { fetchMovie } from './modal_movie';
//import { renderMovie } from './fetch/fetchByKey';

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

const clearLibrary = () => (libraryGallery.innerHTML = '');

const renderLibrary = data =>
  libraryGallery.insertAdjacentHTML('beforeend', movieCard(data));

const showFilms = () => {
  clearLibrary();
  watchedArr.forEach(id => fetchMovie(id).then(data => renderLibrary(data)));
};

console.log(showFilms);

watchedBtn?.addEventListener('click', showFilms);

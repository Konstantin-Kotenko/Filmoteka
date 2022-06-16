// import axios from 'axios';
import { getFromStorage } from './storage';
import oneMovieCard from '../template/oneMoviecard.hbs';
// import { BASE_URL, API_KEY } from './api/api';
import { refs } from './refs.js';
import { getDataFilms } from '../api/getDataFilms';

const { libraryGallery, btnWatched, btnQueue } = refs.library;

// const fetchById = async id => {
//   try {
//     const customIdAxios = axios.create({
//       baseURL: `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
//     });
//     const data = await customIdAxios.get('');
//     return data;
//   } catch {
//     Notiflix.Notify.failure('Search result not successful');
//   }
// };
const dataCombine = movie => {
  return {
    ...movie,
    year: movie.release_date.slice(0, 4),
  };
};
export const requestForQueue = async () => {
  libraryGallery.innerHTML = '';
  const queuedArr = getFromStorage('filmsQueue');
  const arrayRender = queuedArr.map(id => {
    getDataFilms(id).then(result => {
      const data = result;
      const fullData = dataCombine(data);
      libraryGallery?.insertAdjacentHTML('beforeend', oneMovieCard(fullData));
    });
  });
  btnQueue.classList.add('orange');
  btnWatched.classList.remove('orange');
};

btnQueue?.addEventListener('click', requestForQueue);

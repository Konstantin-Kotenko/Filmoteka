import axios from 'axios';
import { getFromStorage } from './storage';
import oneMovieCard from '../template/oneMoviecard.hbs';
import { BASE_URL, API_KEY } from './api/api';
import {refs} from './refs.js';
import { dynamicRefs } from './dynamicRefs';
import { showMovieCard } from './modal_movie';

const {libraryGallery, btnWatched, btnQueue} = refs.library;
console.log(refs.library);
const fetchById = async id => {
  try {
    const customIdAxios = axios.create({
      baseURL: `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    });
    const data = await customIdAxios.get('');
    return data;
  } catch {
    Notiflix.Notify.failure('Search result not successful');
  }
};


const dataCombine = (movie) => {
  return {
    ...movie,
    year: movie.release_date.slice(0, 4),
};
}
export const requestForWatched = async () => {
  const liveRefs = dynamicRefs();
  libraryGallery.innerHTML = '';
  const watchedArr = getFromStorage('filmsWatched');
  const arrayForRender = watchedArr.map(id => {
    fetchById(id).then(result => {
      const { data } = result;
   const fullData = dataCombine(data);
      libraryGallery?.insertAdjacentHTML('beforeend', oneMovieCard(fullData));
    });
  });
  btnWatched.classList.add('orange');
  btnQueue.classList.remove('orange');
};

btnWatched?.addEventListener('click', requestForWatched);
libraryGallery?.addEventListener('click', showMovieCard);

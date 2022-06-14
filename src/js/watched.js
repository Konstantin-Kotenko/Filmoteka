import axios from 'axios';
import { getFromStorage } from './storage';
import oneMovieCard from '../template/oneMoviecard.hbs';
import { BASE_URL, API_KEY } from './api/api';
import {renderingPaginationMarkup} from './pagination.js'
import {requestForPage} from './fetch/trendingMovie.js'

const watchedBtn = document.querySelector('.btn--watched');
const libraryGallery = document.querySelector('.gallery--library');
const paginationList = document.querySelector('.pagination-list');
// const gallery = document.querySelector('.gallery');
// if(libraryGallery.innerHTML = ''){
//   paginationList.innerHTML = '';
// }
let libraryPage = 1;
let maxPages = 1;
renderingPaginationMarkup(libraryPage, maxPages);

removeEventListener('DOMContentLoaded', requestForPage);
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

function slicins(string) {
  return string.slice(0, 4);
}

const requestForWatched = async () => {
  libraryGallery.innerHTML = '';
  const watchedArr = getFromStorage('filmsWatched');
  // console.log(watchedArr);
  const arrayForRender = watchedArr.map(id => {
    fetchById(id).then(result => {
      const { data } = result;
      data.release_date = slicins(data.release_date);
      libraryGallery.insertAdjacentHTML('beforeend', oneMovieCard(data));
    });
  });
};

requestForWatched();

watchedBtn?.addEventListener('click', requestForWatched);

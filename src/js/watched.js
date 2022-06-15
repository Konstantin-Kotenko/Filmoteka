import axios from 'axios';
import { getFromStorage } from './storage';
import oneMovieCard from '../template/oneMoviecard.hbs';
import { BASE_URL, API_KEY } from './api/api';
import {refs} from './refs.js'
import {renderingPaginationMarkup} from './pagination.js'

const {libraryGallery, btnWatched, btnQueue} = refs.library;
let libraryPage = 1;
let totalPages = 1;

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

export const requestForWatched = async () => {
  libraryGallery.innerHTML = '';
  const watchedArr = getFromStorage('filmsWatched');
  const arrayForRender = watchedArr.map(id => {
    fetchById(id).then(result => {
      const { data } = result;
      data.release_date = slicins(data.release_date);
      libraryGallery?.insertAdjacentHTML('beforeend', oneMovieCard(data));
    });
  });
  btnWatched.classList.add('orange');
  btnQueue.classList.remove('orange');
  renderingPaginationMarkup(libraryPage, totalPages);
};



btnWatched?.addEventListener('click', requestForWatched);
libraryGallery?.addEventListener('DOMContentLoaded', requestForWatched);

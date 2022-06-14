import axios from 'axios';
import { getFromStorage } from './storage';
import oneMovieCard from '../template/oneMoviecard.hbs';
import { BASE_URL, API_KEY } from './api/api';
import {renderingPaginationMarkup} from './pagination.js'

const watchedBtn = document.querySelector('.btn--watched');
const libraryGallery = document.querySelector('.gallery--library');


// let libraryPage = 1;
// let totalPages = 1;

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
// Does not work the pagination of librarry page. 
// It sets the pagination from the request function of trendongMovie

export const requestForWatched = async () => {
 
  const watchedArr = getFromStorage('filmsWatched');
  const arrayForRender = watchedArr.map(id => {
    fetchById(id).then(result => {
      const { data } = result;
      data.release_date = slicins(data.release_date);
      libraryGallery?.insertAdjacentHTML('beforeend', oneMovieCard(data));
      
      console.log(data);
    
    });
    
  });
  // renderingPaginationMarkup(libraryPage, totalPages);
};

requestForWatched();

watchedBtn?.addEventListener('click', requestForWatched);
libraryGallery?.addEventListener('DOMContentLoaded', requestForWatched);

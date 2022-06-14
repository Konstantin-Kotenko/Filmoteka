import axios from 'axios';
import {
  renderingPaginationMarkup,
} from '../pagination.js';
import { BASE_URL, API_KEY } from '../api/api';
import movieCard from '../../template/movieCard.hbs';
import { showLoader, hideLoader } from '../loader.js';
import { getGenres, dataCombine } from './fetchDateAndGenres.js';

// let popParams = {
//   page: 1,
//   language: 'en-US',

// };

const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery?.insertAdjacentHTML('beforeend', movieCard(data));

export const fetchPopularMovie = async page =>
  await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`).catch(e => console.error(e));
 
    
export const requestForPage = async (page=1) => {
  hideLoader();
  const { data } = await fetchPopularMovie(page);
  const totalPages = data.total_pages;
  const popPage = data.page;
  gallery.innerHTML = '';
  const movies = data.results;
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);
  renderMovie(fullInfo);
  renderingPaginationMarkup(popPage, totalPages);
  console.log(data.total_pages);
  showLoader();
};

requestForPage();
document?.addEventListener('DOMContentLoaded', fetchPopularMovie);



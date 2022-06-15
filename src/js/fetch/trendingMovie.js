import axios from 'axios';
import { renderingPaginationMarkup } from '../pagination.js';
import { BASE_URL, API_KEY } from '../api/api';
import movieCard from '../../template/movieCard.hbs';
import { showLoader, hideLoader } from '../loader.js';
import { dataCombine } from '../getDateAndGenres.js';
import { getGenres } from '../../api/getGeners.js';
// let popParams = {
//   page: 1,
//   language: 'en-US',

// };

const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery?.insertAdjacentHTML('beforeend', movieCard(data));

export const fetchPopularMovie = async page =>
  await axios
    .get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`)
    .catch(e => console.error(e));

export const requestForPage = async page => {
  hideLoader();

  const { data } = await fetchPopularMovie(page);
  const totalPages = data.total_pages;
  renderingPaginationMarkup(page, totalPages);
  const movies = data.results;
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);
  renderMovie(fullInfo);

  showLoader();
};

gallery?.addEventListener('DOMContentLoaded', requestForPage);

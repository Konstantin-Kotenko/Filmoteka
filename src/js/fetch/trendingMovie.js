import axios from 'axios';

import { currentPage, pageRefs } from '../pagination.js';
import { BASE_URL, API_KEY } from '../api/api';
import movieCard from '../../template/movieCard.hbs';
import { showLoader, hideLoader } from '../loader.js';
import { getGenres, dataCombine } from './fetchDateAndGenres.js';

// const refsMovie = {
//   page: currentPage,
//   language: 'en-US',

// };

const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery?.insertAdjacentHTML('beforeend', movieCard(data));

export const fetchPopularMovie = async page =>
  await axios
    .get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`
    )
    .catch(e => console.error(e));

export const requestForPage = async () => {
  hideLoader();
  const { data, total_pages } = await fetchPopularMovie(currentPage);

  const movies = data.results;

  pageRefs.lastPageBtn.textContent = total_pages;
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);
  renderMovie(fullInfo);
  showLoader();
};
requestForPage();
document.addEventListener('DOMContentLoaded', fetchPopularMovie);

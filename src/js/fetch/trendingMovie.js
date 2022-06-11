import axios from 'axios';
import './fetchByKey.js';

import { currentPage, pageRefs } from '../pagination.js';
import { BASE_URL, API_KEY } from '../api/api';
import movieCard from '../../template/movieCard.hbs';
import { showLoader, hideLoader } from '../loader.js';
import { genres, dataCombine } from './fetchDateAndGenres.js';

// const refsMovie = {
//   page: currentPage,
//   language: 'en-US',

// };

const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery.insertAdjacentHTML('beforeend', movieCard(data));

export const fetchPopularMovie = async page =>
  await axios
    .get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`
    )
    .catch(e => console.error(e));

export const requestForPage = async () => {
  hideLoader();
  await fetchPopularMovie(currentPage).then(({ data }) => {
    console.log(data);
    const movies = data.results;
    const totalPages = data.total_pages;
    pageRefs.lastPageBtn.textContent = totalPages;
    const allGenres = genres();
    const fullInfo = dataCombine(movies, allGenres);
    renderMovie(fullInfo);
    showLoader();
  });
};
requestForPage();
document.addEventListener('DOMContentLoaded', fetchPopularMovie);

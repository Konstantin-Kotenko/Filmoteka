import { currentPage, defineResultsPerPage } from '../pagination.js';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../api/api';
import movieCard from '../../template/movieCard.hbs';
const axios = require('axios');
// const refsMovie = {
//   page: currentPage,
//   language: 'en-US',
// };
const cutItems = (array, number) => array.slice(0, number);

const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery.insertAdjacentHTML('beforeend', movieCard(data));

export const fetchPopularMovie = async (page) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`
    );
    console.log(data);
    const movies = data.results;
    // const allGenres = getGenres();
    // const fullTrendData = dataCombine(movies, allGenres);
    const size = defineResultsPerPage();
    renderMovie(cutItems(movies, size));
  } catch (error) {
    console.error(error);
  }
};

 document.addEventListener('DOMContentLoaded', fetchPopularMovie);



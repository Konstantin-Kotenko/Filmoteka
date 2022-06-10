import { currentPage, defineResultsPerPage, pageRefs } from '../pagination.js';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../api/api';
import movieCard from '../../template/movieCard.hbs';
const axios = require('axios');
// const refsMovie = {
//   page: currentPage,
//   language: 'en-US',

// };
// const cutItems = (array, number) => array.slice(0, number);

const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery.insertAdjacentHTML('beforeend', movieCard(data));

export const fetchPopularMovie = async page => 
         await axios.get(
          `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${currentPage}`
        ).catch((e)=>console.error(e))
         
    // const allGenres = getGenres();
    // const fullTrendData = dataCombine(movies, allGenres);
 
export const requestForPage = async() => {
  await fetchPopularMovie(currentPage).then(({data}) => {
console.log(data);
const movies = data.results;
const totalPages = data.total_pages;
pageRefs.lastPageBtn.textContent = totalPages;
console.log(totalPages);
renderMovie(movies);
  });
}
requestForPage();
document.addEventListener('DOMContentLoaded', fetchPopularMovie);

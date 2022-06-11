import { Notify } from 'notiflix';
import axios from 'axios';

import { currentPage, pageRefs, onPageSearch } from '../pagination.js';
import { BASE_URL, API_KEY } from '../api/api.js';
import { showLoader, hideLoader } from '../loader.js';

import movieCard from '../../template/movieCard.hbs';

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery.insertAdjacentHTML('beforeend', movieCard(data));

export const filmsParams = {
  query: '',
};

const fetchfilmsByKey = async params =>
  await axios
    .get(`${BASE_URL}/search/movie?api_key=${API_KEY}`, { params })
    .catch(e => console.error(e));

export const requestForMovie = async () => {
  hideLoader();
  await fetchfilmsByKey(filmsParams).then(({ data }) => {
    const movies = data.results;
    const totalPages = data.total_pages;
    console.log(data);
    pageRefs.lastPageBtn.textContent = totalPages;
    // const fullSearchData = dataCombine(movies, allGenres);
    console.log(totalPages);
    renderMovie(movies);
    showLoader();
  });
};

const onSearch = e => {
  e.preventDefault();
  onPageSearch();
  gallery.innerHTML = '';
  filmsParams.query = e.currentTarget.elements[0].value;
  requestForMovie();
};

formEl.addEventListener('submit', onSearch);

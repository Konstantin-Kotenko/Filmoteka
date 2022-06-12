import { Notify } from 'notiflix';
import axios from 'axios';

import { currentPage, pageRefs, onPageSearch } from '../pagination.js';
import { BASE_URL, API_KEY } from '../api/api.js';
import { showLoader, hideLoader } from '../loader.js';
import movieCard from '../../template/movieCard.hbs';
import { getGenres, dataCombine } from './fetchDateAndGenres.js';

const formEl = document.querySelector('#search-form');
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
  const { data, total_pages } = await fetchfilmsByKey(filmsParams);
  const movies = data.results;

  pageRefs.lastPageBtn.textContent = total_pages;
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);

  renderMovie(fullInfo);
  showLoader();
};

const onSearch = e => {
  e.preventDefault();
  onPageSearch();
  gallery.innerHTML = '';
  filmsParams.query = e.currentTarget.elements[0].value;

  if (filmsParams.query.length <= 1) {
    Notify.info(
      'No matches found for your query. Enter the correct movie name.'
    );
  }

  requestForMovie();
};

formEl?.addEventListener('submit', onSearch);

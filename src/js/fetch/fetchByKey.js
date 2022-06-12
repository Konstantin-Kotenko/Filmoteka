import { Notify } from 'notiflix';
import axios from 'axios';

import { currentPage } from '../pagination.js';
import { BASE_URL, API_KEY } from '../api/api.js';
import { showLoader, hideLoader } from '../loader.js';
import movieCard from '../../template/movieCard.hbs';
import { getGenres, dataCombine } from './fetchDateAndGenres.js';
Notify.init({
  width: '550px',
  position: 'center-top',
  distance: '150px',
  opacity: 1,
  fontSize: '16px',
  failure: {
    background: 'transparent',
    textColor: '#FF001B',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});

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
    .catch(error => console.error(error));

export const requestForMovie = async () => {
  hideLoader();


  if (movies.length === 0) {
    return Notify.failure(
      'Search result not successful. Enter the correct movie name and try again.'
    );
  }
  console.log(data);
  pageRefs.lastPageBtn.textContent = total_pages;
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);

  await fetchfilmsByKey(filmsParams).then(({ data }) => {
    const movies = data.results;
    const totalPages = data.total_pages;
    console.log(data);
    console.log(totalPages);
    renderMovie(movies);
    showLoader();
  });
};

const onSearch = e => {
  e.preventDefault();
 
  gallery.innerHTML = '';
  filmsParams.query = e.currentTarget.elements[0].value;

  if (filmsParams.query.length <= 1) {
    return Notify.failure(
      'Search result not successful. Enter the correct movie name and try again.'
    );
  }

  requestForMovie();
};

formEl?.addEventListener('submit', onSearch);

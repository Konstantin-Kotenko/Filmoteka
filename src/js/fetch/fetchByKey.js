import { Notify } from 'notiflix';
import axios from 'axios';

import { renderingPaginationMarkup } from '../pagination.js';
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
  useIcon: false,
  fontAwesomeIconSize: '0px',
  failure: {
    background: 'transparent',
    textColor: '#FF001B',
  },
});

if (window.innerWidth < 768) {
  Notify.init({
    width: '300px',
    position: 'center-top',
    distance: '0px',
    fontSize: '12px',
    useIcon: false,
    fontAwesomeIconSize: '0px',
    failure: {
      background: 'transparent',
      textColor: '#FF001B',
    },
  });
}

const onChangeSize = () => {
  if (window.innerWidth < 768) {
    Notify.init({
      width: '300px',
      position: 'center-top',
      distance: '0px',
      fontSize: '12px',
      useIcon: false,
      fontAwesomeIconSize: '0px',
      failure: {
        background: 'transparent',
        textColor: '#FF001B',
      },
    });
  } else {
    Notify.init({
      width: '550px',
      position: 'center-top',
      distance: '150px',
      opacity: 1,
      fontSize: '16px',
      useIcon: false,
      fontAwesomeIconSize: '0px',
      failure: {
        background: 'transparent',
        textColor: '#FF001B',
      },
    });
  }
};
window.addEventListener('resize', onChangeSize);

const formEl = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const paginationList = document.querySelector('.pagination-list');
export const filmsParams = {
  query: '',
  page: 1,
};
const renderMovie = data =>
  gallery?.insertAdjacentHTML('beforeend', movieCard(data));

const fetchfilmsByKey = async params =>
  await axios
    .get(`${BASE_URL}/search/movie?api_key=${API_KEY}`, { params })
    .catch(error => console.error(error));

export const requestForMovie = async page => {
  hideLoader();
  gallery.innerHTML = '';

  filmsParams.page = page;
  const { data } = await fetchfilmsByKey(filmsParams);
  const movies = data.results;
  const totalSearchPages = data.total_pages;
  renderingPaginationMarkup(page, totalSearchPages);
  if (movies.length === 0) {
    showLoader();
    return Notify.failure(
      'Search result not successful. Enter the correct movie name and try again.'
    );
  }
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);
  renderMovie(fullInfo);
  showLoader();
};

const onSearch = e => {
  e.preventDefault();

  gallery.innerHTML = '';
  filmsParams.query = e.currentTarget.elements[0].value;
  if (filmsParams.query.length <= 1) {
    paginationList.innerHTML = '';
    return Notify.failure(
      'Search result not successful. Enter the correct movie name and try again.'
    );
  }
  let startPage = 1;
  requestForMovie(startPage);
};

formEl?.addEventListener('submit', onSearch);

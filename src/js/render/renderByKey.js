import { Notify } from 'notiflix';
import { renderingPaginationMarkup } from '../pagination.js';
import { showLoader, hideLoader } from '../loader.js';
import movieCard from '/src/template/movieCard.hbs';
import { dataCombine } from '../genreUtils.js';
import { getGenres } from '/src/api/getGeners';
import { filmsParams, getFilmsByKey } from '../../api/getFilmsByKey.js';
import { refs } from '../refs/refs';
import { addToStorage } from '../localStorage/storage.js';

export const renderMovie = data =>
  refs.home.gallery?.insertAdjacentHTML('beforeend', movieCard(data));

export const requestForMovie = async page => {
  hideLoader();

  filmsParams.page = page;
  const { ...data } = await getFilmsByKey();
  const movies = data.results;
  const totalSearchPages = data.total_pages;
  renderingPaginationMarkup(page, totalSearchPages);
  if (movies.length === 0) {
    showLoader();
    refs.pagination.paginationList.innerHTML = '';
    Notify.failure(
      'Search result not successful. Enter the correct movie name and try again.'
    );
    return;
  }
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);
  renderMovie(fullInfo);
  const currentPage = data.page;
  addToStorage('active-search', currentPage);
  showLoader();
};

const onSearch = e => {
  e.preventDefault();

  refs.home.gallery.innerHTML = '';
  filmsParams.query = e.currentTarget.elements[0].value;
  if (filmsParams.query.length <= 1) {
    refs.pagination.paginationList.innerHTML = '';
    Notify.failure(
      'Search result not successful. Enter the correct movie name and try again.'
    );
    return;
  }
  let startPage = filmsParams.page;
  requestForMovie(startPage);
};

refs.home.formEl?.addEventListener('submit', onSearch);

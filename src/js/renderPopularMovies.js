import { renderingPaginationMarkup } from './pagination.js';
import movieCard from '../template/movieCard.hbs';
import { showLoader, hideLoader } from './loader.js';
import { dataCombine } from './getDateAndGenres.js';
import { getGenres } from '../api/getGeners.js';
import { popularParams, getPopularMovie } from '../api/getPopularMovie.js';
import { refs } from './refs.js';
import {addToStorage} from './storage';

const renderMovie = data =>
  refs.home.gallery?.insertAdjacentHTML('beforeend', movieCard(data));

export const requestForPage = async page => {
  hideLoader();

  popularParams.page = page;
  const { ...data } = await getPopularMovie(page);
  const totalPages = data.total_pages;
  renderingPaginationMarkup(page, totalPages);
  const movies = data.results;
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);
  renderMovie(fullInfo);
  const currentPage = data.page;
  addToStorage('active-popular', currentPage);
  refs.filter.popularBtn.classList.add('btn-tab-active');
  showLoader();
};

refs.home.gallery?.addEventListener('DOMContentLoaded', requestForPage);

import { renderingPaginationMarkup } from '../pagination.js';
import movieCard from '/src/template/movieCard.hbs';
import { showLoader, hideLoader } from '../loader.js';
import { dataCombine } from '../getDateAndGenres.js';
import { getGenres } from '../../api/getGeners.js';
import { popularParams, getPopularMovie } from '../../api/getPopularMovie.js';
import { refs } from '../refs/refs';

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

  showLoader();
};

refs.home.gallery?.addEventListener('DOMContentLoaded', requestForPage);

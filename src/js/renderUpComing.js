import { renderingPaginationMarkup } from './pagination.js';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from './loader.js';
import { dataCombine } from './getDateAndGenres.js';
import { getGenres } from '../api/getGeners.js';
import { upParams, getUpcomingFilms } from '../api/getUpcomingFilms';
import {addToStorage} from './storage';


export const renderUpComing = async page => {
    hideLoader();
    upParams.page = page;
    const { ...data } = await getUpcomingFilms(page);
    showLoader();
    renderingPaginationMarkup(page, data.total_pages);
    const { genres } = await getGenres();
    const fullInfo = dataCombine(data.results, genres);
  renderMovie(fullInfo);
  const currentPage = data.page;
  addToStorage('active-up', currentPage);
    showLoader();
  };
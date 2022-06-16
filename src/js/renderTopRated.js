import { renderingPaginationMarkup } from './pagination.js';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from './loader.js';
import { dataCombine } from './getDateAndGenres.js';
import { getGenres } from '../api/getGeners.js';
import { topParams, getTopFilms } from '../api/getTopFilms.js';
import {addToStorage} from './storage';



export const renderTopRated = async page => {
    hideLoader();
    topParams.page = page;
    const { ...data } = await  getTopFilms();
    showLoader();
    const currentPage = data.page;
    renderingPaginationMarkup(page, data.total_pages);
    const { genres } = await getGenres();
    const fullInfo = dataCombine(data.results, genres);
  renderMovie(fullInfo);
  addToStorage('active-top', currentPage);
    showLoader();
  };
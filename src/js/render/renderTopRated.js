import { renderingPaginationMarkup } from '../pagination';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from '../loader.js';
import { dataCombine } from '../getDateAndGenres.js';
import { getGenres } from '/src/api/getGeners';
import { topParams, getTopFilms } from '../../api/getTopFilms';
import {addToStorage} from '../stoge/storage';



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

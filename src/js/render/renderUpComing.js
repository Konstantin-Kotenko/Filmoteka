import { renderingPaginationMarkup } from '../pagination';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from '../loader';
import { dataCombine } from '../getDateAndGenres';
import { getGenres } from '/src/api/getGeners';
import { upParams, getUpcomingFilms } from '../../api/getUpcomingFilms';
import {addToStorage} from '../stoge/storage';

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

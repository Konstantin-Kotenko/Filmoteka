import { renderingPaginationMarkup } from '../pagination';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from '../loader';
import { dataCombine } from '../genreUtils';
import { getGenres } from '/src/api/getGeners';
import { upParams, getUpcomingFilms } from '/src/api/getUpComingFilms';
import { addToStorage } from '../localStorage/storage';

export const renderUpComing = async page => {
  hideLoader();
  upParams.page = page;
  const { ...data } = await getUpcomingFilms(page);
  renderingPaginationMarkup(page, data.total_pages);
  const { genres } = await getGenres();
  const fullInfo = dataCombine(data.results, genres);
  renderMovie(fullInfo);
  const currentPage = data.page;
  addToStorage('active-up', currentPage);
  showLoader();
};

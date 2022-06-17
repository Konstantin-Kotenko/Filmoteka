import { api } from './api';
import {showLoader, hideLoader} from '../js/loader';

export const getDataFilms = async id => {
  try {
    hideLoader();
    const { data } = await api.get(`/movie/${id}`);
    showLoader();
    return data;
  } catch {
    Notiflix.Notify.failure('Search result not successful');
  }
};

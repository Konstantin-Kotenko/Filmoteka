import { api } from './api';
import {Notify} from 'notiflix';
import {showLoader, hideLoader} from '../js/loader'

export const getTrailer = async id => {
  try {
    hideLoader();
    const data = await api.get(`/movie/${id}/videos`);
    showLoader();
    return data;
  } catch {
    Notify.failure('Search result not successful');
  }

};

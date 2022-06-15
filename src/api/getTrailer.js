import { api } from './api';
import Notiflix from 'notiflix';

export const getTrailer = async id => {
  try {
    const data = await api.get(`/movie/${id}/videos`);
    return data;
  } catch {
    Notiflix.Notify.failure('Search result not successful');
  }
};

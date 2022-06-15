import { api } from './api';

const getTrailer = async id => {
  try {
    const { data } = api.get(`/movie/${id}/videos`);
    return data;
  } catch {
    Notiflix.Notify.failure('Search result not successful');
  }
};

import { api } from './api';

export const getDataFilms = async id => {
  try {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

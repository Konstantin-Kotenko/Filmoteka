import { api } from './api';

const getDataFilms = async id => {
  try {
    const { data } = api.get(`/movie/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

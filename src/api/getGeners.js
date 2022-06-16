import { api } from './api';

export const getGenres = async () => {
  try {
    const { data } = await api.get('/genre/movie/list');
    return data;
  } catch (error) {
    console.log(error);
  }
};

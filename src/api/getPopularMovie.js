import { api } from './api';

const popularParams = {
  page: 1,
};

const getPopularMovie = async () => {
  try {
    const { data } = await api.get('/trending/movie/day', {
      params: popularParams,
    });
    return data;
  } catch {
    e => console.log(e);
  }
};

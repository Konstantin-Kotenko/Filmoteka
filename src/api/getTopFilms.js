import { api } from './api';
export const topParams = {
  page: 1,
};

export const getTopFilms = async () => {
  try {
    const { data } = await api.get('/movie/top_rated', {
      params: topParams});
    return data;
  } catch (error) {
    console.log(error);
  }
};

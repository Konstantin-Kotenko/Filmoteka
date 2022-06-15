import { api } from './api';

const filmsParams = {
  query: '',
  page: 1,
};

const getFilmsByKey = async () => {
  try {
    const { data } = await api.get('/search/movie', { params: filmsParams });
    return data;
  } catch (error) {
    console.log(error);
  }
};

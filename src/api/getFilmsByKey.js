import { api } from './api';

export const getFilmsByKey = async id => {
  try {
    const { data } = await api.get('/movie/' + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

import { api } from './api';

const getGenres = async () => {
  try {
    const { data } = await api.get('/genre/movie/list');
    return data;
  } catch (e) {
    console.log(e);
  }
};

const dataCombine = (films, allGenres) => {
  return films.map(film => ({
    ...film,
    year: film.genre_ids
      .map(id => allGenres.find(element => element.id === id)?.name)
      .slice(0, 3),
  }));
};

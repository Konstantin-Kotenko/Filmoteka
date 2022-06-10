import { Notify } from 'notiflix';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../api/api.js';

function createYear(obj) {
  return obj.release_date ? obj.release_date.split('-')[0] : '';
}

function createGenresFromTrend(array, genres) {
  return array
    .map(id => genres.filter(element => element.id === id))
    .slice(0, 3)
    .flat();
}

function createGenresFromID(array) {
  return array.genres
    .map(genre => genre.name)
    .slice(0, 3)
    .flat();
}

function dataCombine(films, getGenres) {
  return films.map(film => ({
    ...film,
    year: createYear(film),
    genres: createGenresFromTrend(film.genre_ids, getGenres),
  }));
}

const customAxiosGenres = axios.create({
  baseURL: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
});

const getGenres = async () => {
  try {
    const { data } = await customAxiosGenres.get();
    return data;
  } catch {
    Notify.failure(
      'Search result not successful. Enter the correct movie name and  try again'
    );
  }
};

export {
  dataCombine,
  createGenresFromTrend,
  createGenresFromID,
  createYear,
  getGenres,
};

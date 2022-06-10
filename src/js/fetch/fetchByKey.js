import { currentPage, pageRefs } from '../pagination.js';
import { Notify } from 'notiflix';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../api/api.js';

import movieCard from '../../template/movieCard.hbs';

// function createYear(obj) {
//   return obj.release_date ? obj.release_date.split('-')[0] : '';
// }

// function createGenresFromTrend(array, genres) {
//   return array
//     .map(id => genres.filter(element => element.id === id))
//     .slice(0, 3)
//     .flat();
// }

// function createGenresFromID(array) {
//   return array.genres
//     .map(genre => genre.name)
//     .slice(0, 3)
//     .flat();
// }

// function dataCombine(films, allGenres) {
//   return films.map(film => ({
//     ...film,
//     year: createYear(film),
//     genres: createGenresFromTrend(film.genre_ids, allGenres),
//   }));
// }

// const customAxiosGenres = axios.create({
//   baseURL: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
// });

// const getGenres = async () => {
//   try {
//     const { data } = await customAxiosGenres.get();
//     return data;
//   } catch {
//     Notify.failure(
//       'Search result not successful. Enter the correct movie name and  try again'
//     );
//   }
// };

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery.insertAdjacentHTML('beforeend', movieCard(data));

const filmsParams = {
  query: '',
};

const fetchfilmsByKey = async params => await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&page=${currentPage}`, { params }).catch((e)=>console.error(e));

export const requestForMovie = async() => {
  await fetchfilmsByKey(filmsParams).then(({data}) => {
const movies = data.results;
const totalPages = data.total_pages;
console.log(data);
pageRefs.lastPageBtn.textContent = totalPages;

// const fullSearchData = dataCombine(movies, allGenres);
console.log(totalPages);
renderMovie(movies);
  });
}

const onSearch = e => {
  e.preventDefault();
  filmsParams.query = e.currentTarget.elements[0].value;
  gallery.innerHTML = '';
  requestForMovie();
};

formEl.addEventListener('submit', onSearch);




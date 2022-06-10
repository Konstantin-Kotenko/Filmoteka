import { Notify } from 'notiflix';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../api/api.js';
import { currentPage, pageRefs } from '../pagination.js';
import movieCard from '../../template/movieCard.hbs';
import { dataCombine, getGenres } from './fetchDateAndGenres.js';
import { pageRefs } from '../pagination.js';

const formEl = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery.insertAdjacentHTML('beforeend', movieCard(data));

const filmsParams = {
  query: '',
};

const fetchfilmsByKey = async params =>
  await axios
    .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&page=${currentPage}`, {
      params,
    })
    .catch(e => console.error(e));

export const requestForMovie = async () => {
  await fetchfilmsByKey(filmsParams).then(({ data }) => {
    const movies = data.results;
    const totalPages = data.total_pages;
    pageRefs.lastPageBtn.textContent = totalPages;
    console.log(totalPages);
    const allGenres = getGenres();
    console.log(allGenres);
    const fullSearchData = dataCombine(movies, allGenres);
    renderMovie(fullSearchData);
  });
};

const onSearch = e => {
  e.preventDefault();
  filmsParams.query = e.currentTarget.elements[0].value;

  if (filmsParams.query.length <= 1) {
    return Notify.info(
      'No matches found for your query. Enter the correct movie name.'
    );
  }

  gallery.innerHTML = '';
  requestForMovie();
  fetchfilmsByKey(filmsParams).then(data => createGallery(data));
  pageRefs.page1Btn.hidden = false;
  pageRefs.showedPageArr.forEach(page => (page.hidden = true));
  pageRefs.afterDotsPage.hidden = true;
  pageRefs.lastPageBtn.hidden = true;
  pageRefs.arrowRightBtn.hidden = true;
  pageRefs.page1Btn.classList.add('pagination__button--current');
};

formEl.addEventListener('submit', onSearch);

// const customAxios = axios.create({
//   baseURL: `${BASE_URL}/search/movie?api_key=${API_KEY}`,
// });

// const fetchfilmsByKey = async params => {
//   try {
//     const { data } = await customAxios.get('', { params });
//     console.log(data);
//     return data;
//   } catch {
//     Notify.failure(
//       'Search result not successful. Enter the correct movie name and  try again'
//     );
//   }
// };

// const renderMovie = movie =>
//   gallery.insertAdjacentHTML('beforeend', movieCard(movie));

// const creatGallary = async () => {
//   await fetchfilmsByKey(filmsParams).then(data => {
//     const movies = data.results;
//     renderMovie(movies);
//     console.log(movies);
//     const allGenres = getGenres();
//     console.log(allGenres);
//     const fullSearchData = dataCombine(movies, allGenres);
//   });
// };

// const onSearch = e => {
//   e.preventDefault();
//   filmsParams.query = e.currentTarget.elements[0].value;

//   if (filmsParams.query.length <= 1) {
//     return Notify.info(
//       'No matches found for your query. Enter the correct movie name.'
//     );
//   }

//   gallery.innerHTML = '';
//   creatGallary();
// };

// formEl.addEventListener('submit', onSearch);

const createGallery = data => {
  //   console.log(data.results[0].backdrop_path);

  const markUp = data.results
    .map(
      result => `<div class="movie-card" id="movie-card">
        <img
          class="movie-card__img"
          src="https://image.tmdb.org/t/p/w500${result.poster_path}"
          alt="#"
        />
        <div class="movie-card__info">
          <h2 class="movie-card__title">${result.original_title}</h2>
          <p class="movie-card__brief">some brife | ${result.release_date}</p>
        </div>
      </div>`
    )
    .join('');

  containerEl.innerHTML = markUp;
};

export { filmsParams, fetchfilmsByKey, onSearch };
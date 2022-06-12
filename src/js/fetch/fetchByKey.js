import { Notify } from 'notiflix';
import axios from 'axios';
import {refs} from '../refs.js';
import { currentPage, renderingPaginationMarkup} from '../pagination.js';
import { BASE_URL, API_KEY } from '../api/api.js';
import { showLoader, hideLoader } from '../loader.js';
import movieCard from '../../template/movieCard.hbs';
import { getGenres, dataCombine } from './fetchDateAndGenres.js';

const formEl = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

const renderMovie = data =>
  gallery.insertAdjacentHTML('beforeend', movieCard(data));
export const filmsParams = {
  query: '', 
};

const fetchfilmsByKey = async params =>
  await axios
    .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&page=${currentPage}`, { params })
    .catch(e => console.error(e));
    
export const requestForMovie = async () => {
  hideLoader();
  await fetchfilmsByKey(filmsParams).then(({ data }) => {
   const totalPages = data.total_pages;
   
    const movies = data.results;
    console.log('search page', data.page);
    console.log(totalPages);
    renderMovie(movies);
    if(currentPage === totalPages){
      refs.paginationList.innerHTML = '';
    }
    
    showLoader();
    return totalPages;
  });
};

const onSearch = e => {
  e.preventDefault();
  gallery.innerHTML = '';
  filmsParams.query = e.currentTarget.elements[0].value;
  if (filmsParams.query.length <= 1) {
    refs.paginationList.innerHTML = '';
    return Notify.info(
      'No matches found for your query. Enter the correct movie name.'
    );
  }
  requestForMovie(); 
  filmsParams.page = currentPage;
  renderingPaginationMarkup(currentPage);
};

formEl?.addEventListener('submit', onSearch);
export {totalPages}
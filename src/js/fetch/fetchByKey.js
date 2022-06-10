import { currentPage, pageRefs } from '../pagination.js'; 
import { Notify } from 'notiflix'; 
import axios from 'axios'; 
import { BASE_URL, API_KEY } from '../api/api.js'; 
 
import movieCard from '../../template/movieCard.hbs'; 
 
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
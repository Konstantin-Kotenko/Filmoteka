import { requestForPage } from './js/fetch/trendingMovie.js';
import './js/fetch/fetchByKey.js';
import './js/scrollTop';
import './js/footer-modal.js';
import './js/fetch/fetchDateAndGenres.js';
import './js/change-theme';
import './js/modal_movie.js';
import './js/storage.js';
import './js/fetch/fetchTrailer';
import './js/pagination.js';
import './js/loginForm';
import { requestForWatched } from './js/watched.js';
import './js/queue.js';
import './api/firebase';
import { isHasUser } from './api/firebase';

isHasUser();

let currentPage = 1;
console.log(document.title);
if (document.title === 'Home') {
  requestForPage(currentPage);
}
if (document.title === 'My Library') {
  requestForWatched(currentPage);
}

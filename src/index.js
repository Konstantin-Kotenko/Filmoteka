import { requestForPage } from './js/fetch/trendingMovie.js';
import './js/fetch/fetchByKey.js';
import './js/scrollTop';
import './js/footer-modal.js';
import './js/getDateAndGenres.js';
import './js/change-theme';
import './js/modal_movie.js';
import './js/storage.js';
import './js/fetch/video-trailer';
import './js/pagination.js';
import { requestForWatched } from './js/watched.js';
import './js/queue.js';

let firstPage = 1;

if (document.title === 'Home') {
  requestForPage(firstPage);
}
if (document.title === 'My Library') {
  requestForWatched(firstPage);
}

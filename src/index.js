import { requestForPage } from './js/render/renderPopularMovies.js';
import './js/render/renderByKey.js';
import './js/scrollTop';
import './js/footer-modal.js';
import './js/getDateAndGenres.js';
import './js/stoge/change-theme';
import './js/modal_movie.js';
import './js/stoge/storage';
import './js/render/video-trailer';
import './js/pagination.js';
import { requestForWatched } from './js/stoge/watched.js';
import './js/stoge/queue.js';
import './js/Notify.js';
import { onChangeSize } from './js/Notify.js';
import './js/filter.js'

let firstPage = 1;

if (document.title === 'Home') {
  requestForPage(firstPage);
}
if (document.title === 'My Library') {
  requestForWatched();
}

window.addEventListener('resize', onChangeSize);

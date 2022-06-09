import modalMovieTemplate from '../template/modal_movie.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const modalMovieRefs = {
  lightbox: document.querySelector('.modal-movie-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlayModal: document.querySelector('.modal-card-overlay'),
};

const lightbox = new SimpleLightbox('.modal-info', {
  docClose: false,
  captionsData: 'alt',
  captionDelay: 250,
});

function modal_movieHandler(movie) {
modalMovieRefs.overlayModal.insertAdjacentHTML(
  'beforeend',
  modalMovieTemplate)
}

export const dynamicRefs = () => {
   return {
        lightbox: document.querySelector('.modal-movie-lightbox'),
        closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
        overlayModal: document.querySelector('.modal-movie-overlay'),
        galleryMovie: document.querySelector('.gallery'),
        galleryMovieLibrary: document.querySelector('.gallery--library'),
        mainContainer: document.querySelector('.main__container'),
        body: document.querySelector('body'),
        trailerBtn: document.querySelector('.buttonYouTubeTrailer'),
        watchedBtn: document.querySelector('.modal-watched-button'),
        queueBtn: document.querySelector('.modal-queue-button'),
      }
}
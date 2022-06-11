import { getFromStorage } from "./storage.js";




const btnQueue = document.querySelector('.btn--queue');
const libraryGallery = document.querySelector('.gallery--library');
const clearLibrary = () => libraryGallery. innerHtml = '';
const showFilms = (key) => {
    clearLibrary();
    const localStr = getFromStorage(key);
   
  
    const queueArr = getFromStorage('filmsQueue');
    queueArr.forEach(id => searchMovieById.then(data => renderMovie(data)))
  }
  const queueBtn = () => {
    refs.watchedBtnRef.classList.remove('orange');
    refs.queueBtnRef.classList.add('orange');
  }
  const watchedBtn = () => {
    refs.watchedBtnRef.classList.add('orange');
    refs.queueBtnRef.classList.remove('orange');
  }
btnQueue.addEventListener('click', () => {
    showFilms('filmsQueue');
    queueBtn();
  });
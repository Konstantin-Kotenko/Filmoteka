import { getFromStorage } from "./storage"
import {refs} from './refs.js'
import { fetchMovie } from './modal_movie';
import  cardFilm from '../template/cardFilm.hbs';

const onLibraryPageWatched = () => {
const renderMovie = movie =>
refs.libraryGallery?.insertAdjacentHTML('beforeend', cardFilm(movie));
const watchedArr = getFromStorage('filmsWatched');

const showFilms = async () => {
refs.libraryGallery.innerHTML = '';
   await watchedArr.forEach(id => {fetchMovie(id)
    .then(data => {console.log(data);
        renderMovie(data)})
  
});
}

const watchedBtn = () => {
    refs.btnWatched.classList.add('orange');
    refs.btnQueue.classList.remove('orange');
}

refs.btnWatched?.addEventListener('click', () => {
    showFilms('filmsWatched');
    watchedBtn();
});
showFilms('filmsWatched');
}
addEventListener('DOMContentLoaded', onLibraryPageWatched)
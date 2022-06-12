import { getFromStorage } from "./storage"
import {refs} from './refs'
import { fetchMovie } from './modal_movie';
import  cardFilm from '../template/cardFilm.hbs';

const onLibraryPageQueue = () => {console.log(document);



const renderMovie = movie =>
refs.libraryGallery?.insertAdjacentHTML('beforeend', cardFilm(movie));
const queuedArr = getFromStorage('filmsQueue');

const showQueue = async () => {
  refs.libraryGallery.innerHTML = '';
   await queuedArr.forEach(id => {fetchMovie(id)
    .then(data => {console.log(data);
        renderMovie(data)})
  
});
}

const watchedBtn = () => {
    refs.btnWatched.classList.add('orange');
    refs.queueBtn.classList.remove('orange');
}

refs.queueBtn?.addEventListener('click', () => {
  showQueue('filmsQueue');
  watchedBtn()
});

}
addEventListener('DOMContentLoaded', onLibraryPageQueue)
import { getFromStorage } from "./storage"

// const libraryContainer = document.querySelector('.gallery--library')
// const watchedBtn = document.querySelector(".btn--watched");

// const watchedListRender = () => {
//     const watchedList = getFromStorage('watchedList')
//     watchedList.map(id => {
//         libraryContainer.insertAdjacentHTML('beforeend', movieCard(id))
//     })
// }

// watchedBtn.addEventListener("click", watchedListRender);

const btnWatched = document.querySelector('.btn--watched');
const libraryGallery = document.querySelector('.gallery--library');

const clearLibrary = () => libraryGallery.innerHTML = '';

const showFilms = (key) => {
    clearLibrary();
    const localStr = getFromStorage(key);

    const watchedArr = getFromStorage('watchedList');
    watchedArr.forEach(id => searchMovieById.then(data => renderMovie(data)))
}

const watchedBtn = () => {
    refs.watchedBtnRef.classList.add('orange');
    refs.queueBtnRef.classList.remove('orange');
}

btnWatched.addEventListener('click', () => {
    showFilms('watchedList');
    watchedBtn();
});
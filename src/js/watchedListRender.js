import { getFromStorage } from "./storage"
import movieCard from "../template/movieCard.hbs"

const libraryContainer = document.querySelector('.library__contaier')
const watchedBtn = document.querySelector(".watched");

const watchedListRender = () => {
    const watchedList = getFromStorage('watchedList')
    watchedList.map(id => {
        // const movie = movies.find(movie => movie.id === id)
        libraryContainer.insertAdjacentHTML('beforeend', movieCard(id))
    })
}

watchedBtn.addEventListener("click", watchedListRender);
import {modalTpl} from '../template/modal_movie.hbs';
export const addToStorage = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error("Set state error: ", error.message);
    }
  };
  
  export const getFromStorage = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error("Get state error: ", error.message);
    }
  };
  
  export const removeFromStorage = key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Remove state error: ", error.message);
    }
  };
  // const modalContent = modalTpl(movie);
  // refs.modalContent.insertAdjacentHTML('beforeend', modalContent);
  const watchedBtn = document.querySelector('.watched');
  const queueBtn = document.querySelector('.queue');
  console.log(watchedBtn);
  console.log(queueBtn);
   
  const monitorBtnChange = () => {
    let filmsWatched = [];
    let localStorageData = getFromStorage('filmsWatched');
    if (localStorageData) {
      filmsWatched = [...JSON.parse(localStorageData)];
    }
    let currentIdFilm = id;

    let filmId = filmsWatched.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      watchedBtn.textContent = 'Delete from watched';
      watchedBtn.classList.remove('active');
    } else {
      watchedBtn.textContent = 'Add to watched';
      watchedBtn.classList.add('active');
    }

    let filmsQueue = [];
    localStorageData = getFromStorage('filmsQueue');
    if (localStorageData) {
      filmsQueue = [...JSON.parse(localStorageData)];
    }

    filmId = filmsQueue.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      queueBtn.textContent = 'Delete from Queue';
      queueBtn.classList.remove('active');

    } else {
      queueBtn.textContent = 'Add to Queue';
      queueBtn.classList.add('active');
    }
  }

  // monitorBtnChange();
  const toggleToWatched = () => {
    let filmsWatched = [];
    let localStorageData = getFromStorage('filmsWatched');
    if (localStorageData) {
      filmsWatched = [...JSON.parse(localStorageData)];
    }
    let currentIdFilm = id;
    const index = filmsWatched.indexOf(currentIdFilm);
    if (index > -1) {
      filmsWatched.splice(index, 1);
    } else filmsWatched.push(id);
    addToStorage('filmsWatched', filmsWatched);
    if(monitorBtnChange()){
      removeFromStorage('filmsWatched')
    }
  }
  const toggleToQueue = () => {
    let filmsQueue = [];
    let localStorageData = getFromStorage('filmsQueue');
    if (localStorageData) {
      filmsQueue = [...JSON.parse(localStorageData)];
    }
    let currentIdFilm = id;
    const index = filmsQueue.indexOf(currentIdFilm);
    if (index > -1) {
      filmsQueue.splice(index, 1);
    } else filmsQueue.push(id);
    addToStorage('filmsQueue', filmsQueue);
    if(monitorBtnChange()){
      removeFromStorage('filmsQueue')
    }
  }

  const handleBtnWatched = () => toggleToWatched(id);
  const handleBtnQueue = () => toggleToQueue(id);

  watchedBtn.addEventListener('click', handleBtnWatched);
  queueBtn.addEventListener('click', handleBtnQueue);
  
  

  
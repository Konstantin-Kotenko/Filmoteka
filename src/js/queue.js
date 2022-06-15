import axios from 'axios';
import { getFromStorage } from './storage';
import oneMovieCard from '../template/oneMoviecard.hbs';
import { BASE_URL, API_KEY } from './api/api';
import {refs} from './refs.js'

const {libraryGallery, btnWatched, btnQueue} = refs.library;

const fetchById = async id => {
  try {
    const customIdAxios = axios.create({
      baseURL: `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    });
    const data = await customIdAxios.get('');
    return data;
  } catch {
    Notiflix.Notify.failure('Search result not successful');
  }
};

function slicins(string) {
  return string.slice(0, 4);
}

export const requestForQueue = async () => {
  libraryGallery.innerHTML = '';
  const queuedArr = getFromStorage('filmsQueue');
  const arrayRender = queuedArr.map(id => {
    fetchById(id).then(result => {
      const { data } = result;
      data.release_date = slicins(data.release_date);
      libraryGallery.insertAdjacentHTML('beforeend', oneMovieCard(data));
    });
  });
  btnQueue.classList.add('orange');
  btnWatched.classList.remove('orange');
};

btnQueue?.addEventListener('click', requestForQueue);

import axios from 'axios';
import { BASE_URL, API_KEY } from '../api/api.js';
import Notiflix from 'notiflix';

const videoplayerBackdrop = document.querySelector('.videoplayer-backdrop');
const videoplayerContainer = document.querySelector('.videoplayer-container');

const fetchTrailer = async id => {
  try {
    const customTrailerAxios = axios.create({
      baseURL: `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`,
    });
    const data = await customTrailerAxios.get('');
    return data;
  } catch {
    Notiflix.Notify.failure('Search result not successful');
  }
};

export const renderTrailer = evt => {
  const id = evt.currentTarget.getAttribute('data-attribute');
  const dataBase = fetchTrailer(id).then(result => {
    const trailersArray = result.data.results;
    const trailerData = trailersArray.find(function chectType(object) {
      return object.type === 'Trailer';
    });
    if (!trailerData) {
      Notiflix.Notify.failure(
        "This film don't have official trailer at this moment"
      );
    } else {
      const videoTitle = trailerData.name;
      const queryKey = trailerData.key;
      const playerMarkup = `
                <iframe class="videoplayer-container__iframe" src="https://www.youtube.com/embed/${queryKey}" title="${videoTitle}"
                // frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                // allowfullscreen></iframe>
            `;
      videoplayerContainer.innerHTML = playerMarkup;
      videoplayerBackdrop.classList.remove('is-hidden');
    }
  });
};

const closeVideoplayer = evt => {
  if (evt.target === evt.currentTarget) {
    videoplayerContainer.innerHTML = '';
    videoplayerBackdrop.classList.add('is-hidden');
  }
};

videoplayerBackdrop?.addEventListener('click', closeVideoplayer);

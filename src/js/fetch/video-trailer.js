import axios from 'axios';
import Notiflix from 'notiflix';
import { BASE_URL, API_KEY } from '../api/api.js';
import { getTrailer } from '../../api/getTrailer';
import { refs } from '../refs.js';

export const renderTrailer = evt => {
  const id = evt.currentTarget.getAttribute('data-attribute');
  const dataBase = getTrailer(id).then(result => {
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
      refs.trailer.videoplayerContainer.innerHTML = playerMarkup;
      refs.trailer.videoplayerBackdrop.classList.remove('is-hidden');
    }
  });
};

const closeVideoplayer = evt => {
  if (evt.target === evt.currentTarget) {
    refs.trailer.videoplayerContainer.innerHTML = '';
    refs.trailer.videoplayerBackdrop.classList.add('is-hidden');
  }
};

refs.trailer.videoplayerBackdrop?.addEventListener('click', closeVideoplayer);
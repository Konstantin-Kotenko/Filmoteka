import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { BASE_URL, API_KEY } from './api';

const filmsParams = {
  query: '',
  page: 1,
};

const customAxios = axios.create({
  baseURL: `${BASE_URL}/search/movie?key=${API_KEY}`,
});

const fetchfilmsByKey = async params => {
  try {
    return await customAxios.get('', { params });
  } catch {
    Notify.failure(
      'Search result not successful. Enter the correct movie name and try again'
    );
  }
};

// export const markupResult = (array, container) => {
//   const markup = cardMarkup(array);
//   container.insertAdjacentHTML('beforeend', markup);
// };

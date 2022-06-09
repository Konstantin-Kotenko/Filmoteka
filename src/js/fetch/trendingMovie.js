import axios from 'axios';
import { BASE_URL, API_KEY } from '../api/api';
import movieCard from '../../template/movieCard.hbs';

const refsMovie = {
  page: 1,
  lenguage: 'en-US',
};

const gallery = document.querySelector('.gallery');
const axios = require('axios');

const fetchPopularMovie = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    console.log(data);
    const movies = data.results;
    renderMovie(movies);
  } catch (error) {
    console.error(error);
  }
};

const renderMovie = data =>
  gallery.insertAdjacentHTML('beforeend', movieCard(data));

fetchPopularMovie().then(data => renderMovie(data));

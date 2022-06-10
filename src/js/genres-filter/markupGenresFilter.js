import { getGenresArray } from "./getGenres";
import { BASE_URL, API_KEY } from '../api/api.js';
const genresParams = '/genre/movie/list';

const genresSelect = document.querySelector('.genres-filter-list');
const headerElement = document.querySelector('header');

headerElement.addEventListener('load',)

genresSelect.innerHTML = markupGenresFilter(BASE_URL, API_KEY, genresParams);

function markupGenresFilter(url,api,requestParams) {
    getGenresArray(url, api, requestParams).then(result => {
        return result.genres.map(genre => {
            return `<option value=${genre.id}>${genre.name}</option>`
        }).join("")
    })
};
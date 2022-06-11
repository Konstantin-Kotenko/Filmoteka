import { getGenresArray } from "./getGenresArray";
import { BASE_URL, API_KEY } from '../api/api.js';
const genresParams = '/genre/movie/list';

const genresSelect = document.querySelector('.genres-filter-list');

genresSelect.innerHTML = markupGenresFilter(BASE_URL, API_KEY, genresParams);

function markupGenresFilter(url,api,requestParams) {
    getGenresArray(url, api, requestParams).then(result => {
        return result.map(genre => {
            return `<option value=${genre.id}>${genre.name}</option>`
        }).join("")
    })
};
import { getGenresArray } from './getGenresArray.js';
import { BASE_URL, API_KEY } from '../api/api.js';
//
const genresSelect = document.querySelector('.genres-filter-list');
//genresSelect.innerHTML = markupGenresFilter(BASE_URL, API_KEY);
//
// async function markupGenresFilter(url,apiKey) {await
//     getGenresArray(url, apiKey).then(result => {
//         return result.map(genre => {
//             return `<option value=${genre.id}>${genre.name}</option>`
//         }).join("")
//     }).then(s => console.log(s));
//};
//function getGenresArray(url, apiKey) {
//    fetch(`${url}/genre/movie/list?api_key=${apiKey}`)
//    .then(r => { return r.json() })
//    .then(res => { return res.genres });
//};
//function markupGenresFilter(url,apiKey) {
//     getGenresArray(url, apiKey).then(result => {
//         return result.map(genre => {
//             return `<option value=${genre.id}>${genre.name}</option>`
//         }).join("")
//     }).then(s => console.log(s));
//};
fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    .then(r => { return r.json() })
    .then(res => { return res.genres })
    .then(result => {
        return result.map(genre => {
            return `<option value=${genre.id}>${genre.name}</option>`
        }).join("")
    }).then(s => genresSelect.innerHTML=s);
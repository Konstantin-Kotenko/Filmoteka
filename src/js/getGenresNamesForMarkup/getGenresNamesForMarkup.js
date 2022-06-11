//import BASE_URL from '../api/api.js';
//import API_KEY from '../api/api.js';
//import { genresArray } from '../genres-filter/test.js';
//
//
//const newFetch = fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`) // запит
//    .then(r => { return r.json() })// отримує обєкт
//    .then(res => { return res.results })// отримуємо масив фільмів
//    .then(movies => {
//        movies.forEach(movie => { movie.genre_names = [];// присвоюємо кожному фільму нову властивість (імя жанра)
//        movies.release_year=movie.release_date?.slice(0,4)//присвоюємо кожному фільму нову властивість (рік виходу)
//        });
//        movies.forEach(movie => {//перебираємо масив фільмів
//            movie.genre_ids
//                .forEach(genre_id => {//перебираємо масив з id жанрів кожного фільма
//                    genresArray//масив з айді та іменами жанрів, тут просто модельний масив, потрібно використати запит для отримання акт.жанрів
//                    .forEach(genre => { if (genre.id === genre_id) { movie.genre_names.push(genre.name) } })//перебираємо цей масив і якщо айді жанру фільму співпадає з фйді модюмасиву, пушимо назву жанру в масив (властивість імена жанрів для кожного фільму)
//                })
//        });
//        return movies
//    }).then(movies => { movies.forEach(movie => { movie.genre_names = movie.genre_names.join() }); return movies }).then(s => console.log(s))ж
//newFetch;
//
//export { newFetch }

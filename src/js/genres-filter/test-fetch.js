//import BASE_URL from '../api/api.js';
//import API_KEY from '../api/api.js';
//
//
//getMoviesData(BASE_URL, API_KEY);
//
//async function getMoviesData(url, apiKey) {
//    const genArray = await
//        fetch(`${url}/genre/movie/list?api_key=${apiKey}}`)
//            .then(r => { return r.json() })
//            .then(res => { return res.genres });
//    const moviesData = await
//        fetch(`${url}/trending/movie/day?api_key=${apiKey}`)
//            .then(r => { return r.json() })
//            .then(res => { return res.results })
//            .then(movies => {
//                movies.forEach(movie => {
//                    movie.genre_names = [];
//                    movie.release_year = movie.release_date.slice(0, 4);
//                });
//                movies.forEach(movie => {
//                    movie.genre_ids
//                        .forEach(genre_id => {
//                            genArray
//                                .forEach(genre => { if (genre.id === genre_id) { movie.genre_names.push(genre.name) } })
//                        })
//                });
//                return movies
//            }).then(movies => { movies.forEach(movie => { movie.genre_names = movie.genre_names.join() }); return movies });
//    console.log(genArray);
//    return genArray;
//};

getMoviesData('https://api.themoviedb.org/3', '9b83de628d16dffe4523b57f7d3aefed');//виклик колбек

import movieCard from '../../template/movieCard.hbs';// імпорт шаблону хендлбарс

const gallery = document.querySelector('.gallery');//елемент галерея

async function getMoviesData(url, apiKey) {
    const genArray = await//пробуємо отримати жанри (змінна для масиву жанрів)
        fetch(`${url}/genre/movie/list?api_key=${apiKey}`)// відправка запиту
            .then(r => { return r.json() })//отримали обєкт,приводимо до потрібного формату
            .then(res => { return res.genres });//з обєкту витягнули масив обєктів жанрів (в кожному айді та назва)
    const moviesData = await// пробуємо отримати дані фільмів
        fetch(`${url}/trending/movie/day?api_key=${apiKey}`)//відправляємо запит
            .then(r => { return r.json() })// приводимо до потрібного формату
            .then(res => { return res.results })// витягуємо масив обєктів фільмів
            .then(movies => {
                movies.forEach(movie => {//перебираємо масив фільмів
                    movie.genre_names = [];//кожному фільму додаємо нову властивість (імена жанрів)
                    movie.release_year = movie.release_date.slice(0, 4);//кожному фільму додаємо рік виходу (беремо з дати виходу)
                });
                movies.forEach(movie => {//перебираємо масив фільмів
                    movie.genre_ids
                        .forEach(genre_id => {//перебираємо в кожному фільмі масив айдішників жанрів
                            genArray//змінна масиву (була обявлена раніше)
                                .forEach(genre => {//перебираємо масив жанрів
                                    if (genre.id === genre_id) { movie.genre_names.push(genre.name) }//якщо айдішники співпадають, то пушимо в масив імен
                                })
                        })
                });
                return movies//отримуємо проміжний масив фільмів
            }).then(movies => {
                movies.forEach(movie => { movie.genre_names = movie.genre_names.slice(0, 3).join() });//обрізаємо масив імен до 3 шт та поєднуємо в строку
                return movies// вертаємо підсумковий масив фільмів
            })
            .then(s => { console.log(s); return s })//перевіряємо себе в консолі
            .then(data => { return gallery.insertAdjacentHTML('beforeend', movieCard(data)) });//додаємо в розмітку з використанням шаблону хендлбарс
    
};

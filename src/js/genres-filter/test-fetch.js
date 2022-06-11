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

const movieData = getMoviesData('https://api.themoviedb.org/3', '9b83de628d16dffe4523b57f7d3aefed');

async function getMoviesData(url, apiKey) {
    const genArray = await
        fetch(`${url}/genre/movie/list?api_key=${apiKey}`)
            .then(r => { return r.json() })
            .then(res => { return res.genres });
    const moviesData = await
        fetch(`${url}/trending/movie/day?api_key=${apiKey}`)
            .then(r => { return r.json() })
            .then(res => { return res.results })
            .then(movies => {
                movies.forEach(movie => {
                    movie.genre_names = [];
                    movie.release_year = movie.release_date.slice(0, 4);
                });
                movies.forEach(movie => {
                    movie.genre_ids
                        .forEach(genre_id => {
                            genArray
                                .forEach(genre => { if (genre.id === genre_id) { movie.genre_names.push(genre.name) } })
                        })
                });
                return movies
            }).then(movies => { movies.forEach(movie => { movie.genre_names = movie.genre_names.join() }); return movies }).then(s => { console.log(s); return s });
    
};
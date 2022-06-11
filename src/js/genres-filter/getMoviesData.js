export function getMoviesArray(url, apiKey, genArray) {
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
}
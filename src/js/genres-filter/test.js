export const genresArray = [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' }, { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' }, { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' }, { id: 36, name: 'History' }, { id: 27, name: 'Horror' }, { id: 10402, name: 'Music' }, { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' }, { id: 878, name: 'Science Fiction' }, { id: 10770, name: 'TV Movie' }, { id: 53, name: 'Thriller' }, { id: 10752, name: 'War' }, { id: 37, name: 'Western' }];
fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=9b83de628d16dffe4523b57f7d3aefed')
    .then(r => { return r.json() })
    .then(res => { return res.results })
    .then(movies => {
        movies.forEach(movie => {
            movie.genre_names = [];
            movies.release_year = movie.release_date;
});
        movies.forEach(movie => {
            movie.genre_ids
                .forEach(genre_id => {
                    genresArray
                        .forEach(genre => { if (genre.id === genre_id) { movie.genre_names.push(genre.name) } })
                })
        });
        return movies
    }).then(s => console.log(s));
    fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=9b83de628d16dffe4523b57f7d3aefed')
    .then(r => { return r.json() })
    .then(res => { return res.results })
    .then(movies => {
        movies.forEach(movie => {
            movie.genre_names = [];
            movies.release_year = [125];
        });
        movies.forEach(movie => {
            movie.genre_ids
                .forEach(genre_id => {
                    genresArray
                    .forEach(genre => { if (genre.id === genre_id) { movie.genre_names.push(genre.name) } })
                })
        });
        return movies
    }).then(movies=>{movies.forEach(movie=>{movie.genre_names=movie.genre_names.join()});return movies}).then(s=>console.log(s))
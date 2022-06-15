const createYear = obj =>
  obj.release_date ? obj.release_date.split('-')[0] : '';

const dataCombine = (films, allGenres) => {
  return films.map(film => ({
    ...film,
    year: createYear(film),
    genres: film.genre_ids
      .map(id => allGenres.find(element => element.id === id)?.name)
      .slice(0, 3),
  }));
};

export { dataCombine, createYear };

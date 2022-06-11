export function getGenresArray(url, apiKey) {
    fetch(`${url}/genre/movie/list?api_key=${apiKey}`)
    .then(r => { return r.json() })
    .then(res => { return res.genres });
}
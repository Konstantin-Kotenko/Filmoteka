export function getGenresArray(url, apiKey, requestParams) {
    fetch(`${url}${requestParams}?api_key=${apiKey}}`).then(r => { return r.json() })
}
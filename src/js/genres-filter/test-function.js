import BASE_URL from "../api/api";
import API_KEY from "../api/api";

import { getGenresArray } from "./getGenresArray";
import { getMoviesArray } from "./getMoviesData";

export const movieDataForHTML = getMoviesDataForMarkup(BASE_URL, API_KEY);


export async function getMoviesDataForMarkup(url, apiKey) {
    const genreArray = await getGenresArray(url, apiKey);
    const movieDataForMarkup = await getMoviesArray(url, apiKey, genreArray);
    console.log(movieDataForMarkup)
    return movieDataForMarkup;
};

//export {getMoviesDataForMarkup}


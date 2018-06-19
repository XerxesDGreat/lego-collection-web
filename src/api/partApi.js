import {getApiUrl} from '../config';
import {handleErrors} from "./helpers";

export const getPartCategories = () => {
    return fetch(getApiUrl() + '/part-categories')
        .then(handleErrors)
        .then(response => response.json())
        .catch(error => console.log(error));
};
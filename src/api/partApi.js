import {getApiUrl} from '../config';
import queryString from 'query-string';

export const getPartCategories = () => {
    return fetch(getApiUrl() + '/part-categories').then(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
};

export const getPartsForCategory = (id) => {
    return fetch(getApiUrl() + '/parts?categoryId=' + id)
        .then(
            response => response.json(),
            error => error
        );
};

export const getPartForId = (id) => {
    return fetch(getApiUrl() + '/parts/' + id)
        .then(
            response => response.json(),
            error => error
        );
};

export const getParts = (filters) => {
    const stringifiedQuery = queryString.stringify(filters);
    const url = getApiUrl() + '/parts?' + stringifiedQuery;
    return fetch(url)
        .then(
            response => response.json(),
            error => error
        );
};
import {addAuthTokenToRequest} from '../api/authApi';
import {getApiUrl} from '../config';
import {handleErrors} from "../api/helpers";
import queryString from 'query-string';
import {combineReducers} from 'redux';
import getPaginator from "paging-dr-redux";

// side effects
export const getUserElements = (filters) => {
    const stringifiedQuery = queryString.stringify(filters);
    const url = getApiUrl() + '/me/elements?' + stringifiedQuery;
    const request = addAuthTokenToRequest({});
    return fetch(url, request)
        .then(handleErrors)
        .then(response => response.json())
        .catch(error => console.log(error));
};

// Paginator
export const userElementsPaginator = getPaginator(getUserElements, {
    entityIdKey: 'id'
});

// Reducers
const reducer = combineReducers({
    entities: userElementsPaginator.entitiesReducer,
    pagination: userElementsPaginator.paginationReducer,
});
export default reducer;

// Side effects
export const updateElementQuantityInStorage = (qtyInStorage, elementId) => {
    const url = getApiUrl() + '/me/elements';
    const requestBody = {
        quantity_in_storage: qtyInStorage,
        element_id: elementId
    };
    let request = {
        body: JSON.stringify(requestBody),
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    };
    request = addAuthTokenToRequest(request);
    return fetch(url, request)
        .then(handleErrors)
        .then(response => response.json())
        .catch(error => console.log(error));
};
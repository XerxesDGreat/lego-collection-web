import {addAuthTokenToRequest} from "../api/authApi";
import {getApiUrl} from "../config";
import {handleErrors} from "../api/helpers";
import queryString from 'query-string';
import {combineReducers} from 'redux';
import getPaginator from "paging-dr-redux";

// side effects
export const getUserParts = (filters) => {
    const stringifiedQuery = queryString.stringify(filters);
    const url = getApiUrl() + '/me/parts?' + stringifiedQuery;
    const request = addAuthTokenToRequest({});
    return fetch(url, request)
        .then(handleErrors)
        .then(response => response.json())
        .catch(error => console.log(error));
};

// Paginator
export const userPartsPaginator = getPaginator(getUserParts, {
    entityIdKey: 'part_num'
});

// Reducers
const reducer = combineReducers({
    entities: userPartsPaginator.entitiesReducer,
    pagination: userPartsPaginator.paginationReducer,
});
export default reducer;

// selectors
export const moduleSelector = state => state.userParts;

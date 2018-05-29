import * as partApi from "../api/partApi";
import * as types from "./actionTypes";

////////////////////////////////////////////
// Part Categories (list)
////////////////////////////////////////////

export function fetchPartCategoriesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchPartCategories(getState())) {
            return dispatch(fetchPartCategories());
        } else {
            return Promise.resolve();
        }
    }
}


function fetchPartCategories() {
    return function(dispatch) {
        dispatch(requestPartCategories());

        return partApi.getPartCategories()
            .then(
                response => dispatch(receivePartCategories(response)),
                error => console.log('an error occurred', error)
            );
    }
}

function shouldFetchPartCategories(state) {
    const partCategories = state.partCategories;
    if (partCategories.items.length < 1) {
        return true;
    }
    return false;
}

function receivePartCategories(response) {
    return {type: types.LOAD_PART_CATEGORIES_SUCCESS, partCategories: response['results']};
}

function requestPartCategories() {
    return {type: types.LOAD_PART_CATEGORIES_REQUEST};
}
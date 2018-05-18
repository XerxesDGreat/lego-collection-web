import partApi from '../api/partApi';
import {LOAD_PART_CATEGORIES_SUCCESS, LOAD_PARTS_SUCCESS} from "./actionTypes";

export function loadPartCategories() {
    return function(dispatch) {
        return partApi.getPartCategories().then(response => {
            dispatch(loadPartCategoriesSuccess(response['data']));
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadPartCategoriesSuccess(partCategories) {
    return {type: LOAD_PART_CATEGORIES_SUCCESS, partCategories};
}
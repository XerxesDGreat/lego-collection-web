import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function partCategoryReducer(state=initialState.partCategories, action) {
    switch(action.type) {
        case types.LOAD_PART_CATEGORIES_SUCCESS:
            return action.partCategories;
        default:
            return state;
    }
}
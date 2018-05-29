import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {partsPaginator} from "../paginators";
import {combineReducers} from 'redux';

const byId = (state, action) => {

};
function partReducer(state=initialState.parts, action) {
    switch(action.type) {
        case types.LOAD_PARTS_FOR_CATEGORY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.LOAD_PARTS_FOR_CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.parts
            });
        case types.LOAD_PARTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.LOAD_PARTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.parts
            });
        default:
            return state;
    }
}

const allPartReducer = combineReducers({
    partReducer,
    parts: partsPaginator.itemsReducer()
});
export default allPartReducer;
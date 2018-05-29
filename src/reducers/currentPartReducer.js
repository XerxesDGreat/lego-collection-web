import * as types from "../actions/actionTypes";
import initialState from './initialState';

export default function currentPartReducer(state=initialState.currentPart, action) {
    switch (action.type) {
        case types.LOAD_PART_FOR_ID_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.LOAD_PART_FOR_ID_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                part: action.part
            });
        default:
            return state;
    }
}
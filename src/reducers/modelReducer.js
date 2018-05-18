import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function modelReducer(state=initialState.models, action) {
    switch(action.type) {
        case types.LOAD_MODELS_SUCCESS:
            return action.models;
        default:
            return state;
    }
}
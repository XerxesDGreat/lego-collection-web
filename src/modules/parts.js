import {combineReducers} from 'redux';
import currentPart from './currentPart';
import queryString from "query-string";
import {handleErrors} from "../api/helpers";
import {getApiUrl} from "../config";
import getPaginator from "paging-dr-redux";

// Actions
export const LOAD_SINGLE_PART_REQUEST = 'lego/load-single-part/REQUEST';
export const LOAD_SINGLE_PART_SUCCESS = 'lego/load-single-part/SUCCESS';
export const LOAD_SINGLE_PART_FAIL = 'lego/load-single-part/FAIL';

// action creators
const requestSinglePart = partNum => {
    return {
        type: LOAD_SINGLE_PART_REQUEST,
        payload: {
            partNum
        }
    };
};

const receiveSinglePart = part => {
    return {
        type: LOAD_SINGLE_PART_SUCCESS,
        payload: part
    }
};

export const getParts = (filters) => {
    const stringifiedQuery = queryString.stringify(filters);
    const url = getApiUrl() + '/parts?' + stringifiedQuery;
    return fetch(url)
        .then(handleErrors)
        .then(response => response.json())
        .catch(error => console.log(error));
};

export const getSinglePart = partNum => {
    return (dispatch, getState) => {
        const part = partForPartNum(getState())(partNum);
        if (part !== undefined) {
            dispatch(receiveSinglePart(part));
            return;
        }
        dispatch(requestSinglePart(partNum));
        const url = getApiUrl() + '/parts/' + partNum;
        return fetch(url)
            .then(handleErrors)
            .then(response => response.json())
            .then(responseJson => dispatch(receiveSinglePart(responseJson)));
    }
};

export const partsPaginator = getPaginator(getParts, {
    entityIdKey: 'part_num'
});

const entityReducer = (state, action) => {
    switch (action.type) {
        case LOAD_SINGLE_PART_SUCCESS:
            return {
                ...state,
                [action.payload.part_num]: action.payload
            };
        default:
            return partsPaginator.entitiesReducer(state, action);
    }
};

// reducer
const parts = combineReducers({
    entities: entityReducer,
    pagination: partsPaginator.paginationReducer,
    currentPart
});
export default parts;

// selectors
export const partForPartNum = state => partNum => state.parts.entities[partNum];
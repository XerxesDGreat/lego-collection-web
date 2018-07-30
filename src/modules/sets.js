import {combineReducers} from 'redux';
import currentPart from './currentPart';
import queryString from "query-string";
import {handleErrors} from "../api/helpers";
import {getApiUrl} from "../config";
import getPaginator from "paging-dr-redux";

// Actions
export const LOAD_SINGLE_SET_REQUEST = 'lego/load-single-set/REQUEST';
export const LOAD_SINGLE_SET_SUCCESS = 'lego/load-single-set/SUCCESS';
export const LOAD_SINGLE_SET_FAIL = 'lego/load-single-set/FAIL';

// action creators
const requestSingleSet = setNum => {
    return {
        type: LOAD_SINGLE_SET_REQUEST,
        payload: {
            setNum
        }
    };
};

const receiveSingleSet = set => {
    return {
        type: LOAD_SINGLE_SET_SUCCESS,
        payload: set
    }
};

export const getSets = (filters) => {
    const stringifiedQuery = queryString.stringify(filters);
    const url = getApiUrl() + '/sets?' + stringifiedQuery;
    return fetch(url)
        .then(handleErrors)
        .then(response => response.json())
        .catch(error => console.log(error));
};

export const getSingleSet = setNum => {
    return (dispatch, getState) => {
        const set = setForSetNum(getState())(setNum);
        if (set !== undefined) {
            dispatch(receiveSingleSet(set));
            return;
        }
        dispatch(requestSingleSet(setNum));
        const url = getApiUrl() + '/sets/' + setNum;
        return fetch(url)
            .then(handleErrors)
            .then(response => response.json())
            .then(responseJson => dispatch(receiveSingleSet(responseJson)));
    }
};

export const setsPaginator = getPaginator('sets', getSets, {
    entityIdKey: 'set_num'
});

const entityReducer = (state, action) => {
    switch (action.type) {
        case LOAD_SINGLE_SET_SUCCESS:
            return {
                ...state,
                [action.payload.set_num]: action.payload
            };
        default:
            return setsPaginator.entitiesReducer(state, action);
    }
};

// reducer
const sets = combineReducers({
    entities: entityReducer,
    pagination: setsPaginator.paginationReducer,
    currentPart
});
export default sets;

// selectors
export const moduleSelector = state => state.sets;
export const setForSetNum = state => setNum => moduleSelector(state).entities[setNum];
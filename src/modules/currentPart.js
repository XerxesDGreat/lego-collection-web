// Actions
import {getApiUrl} from "../config";

const REQUEST = 'lego/current-part/REQUEST';
const SUCCESS = 'lego/current-part/SUCCESS';

// Reducers
const currentPartInitialState = {
    isFetching: false,
    part: undefined
};

const currentPart = (state = currentPartInitialState, action) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                isFetching: true,
                part: undefined
            };
        case SUCCESS:
            return {
                ...state,
                isFetching: false,
                part: action.payload.part
            };
        default:
            return state;
    }
};

export default currentPart;

// Action creators
const receivePartForId = (partId, part) =>  {
    return {
        type: SUCCESS,
        payload: {
            part: part,
            partId: partId
        }
    }
};

const requestPartForId = (partId) => {
    return {
        type: REQUEST,
        payload: {
            partId: partId
        }
    }
};

// Side effects
export const fetchPartById = (partId) => {
    return (dispatch) => {
        dispatch(requestPartForId(partId));
        return getPartForId(partId)
            .then(
                data => dispatch(receivePartForId(partId, data)),
                error => console.log('An error occurred', error)
            )
    }
};

const getPartForId = (id) => {
    return fetch(getApiUrl() + '/parts/' + id)
        .then(
            response => response.json(),
            error => error
        );
};
import {getApiUrl} from "../config";
import {combineReducers} from 'redux';

// actions
const REQUEST = 'lego/elements-for-part/REQUEST';
const SUCCESS = 'lego/elements-for-part/SUCCESS';

// Reducers
export const elementsForSinglePartInitialState = {
    loading: false,
    elements: []
};

const elementsForPartsInitialState = {};

const elementsForPart = (state = elementsForPartsInitialState, action = {}) => {
    switch (action.type) {
        case REQUEST:
            const singlePartState = {...elementsForSinglePartInitialState, loading: true};
            return {
                ...state,
                [action.payload.partNum]: singlePartState
            };
        case SUCCESS:
            const newState = {...state};
            const {partNum, elements} = action.payload;
            newState[partNum].loading = false;
            newState[partNum].elements = elements.map(element => element.id);
            return newState;
        default:
            return state;
    }
};

const entities = (state = {}, action = {}) => {
    switch (action.type) {
        case SUCCESS:
            const newState = {...state};
            action.payload.elements.forEach(element => {
                newState[element.id] = element;
            });
            return newState;
        default:
            return state;
    }
};

export default combineReducers({
    elementsForPart,
    entities
});

// Action creators
const receiveElementsForPart = (partNum, elements) =>  {
    return {
        type: SUCCESS,
        payload: {
            partNum,
            elements
        }
    }
};

const requestElementsForPart = (partNum) => {
    return {
        type: REQUEST,
        payload: {
            partNum
        }
    }
};

// selectors
export const getElementsForPart = (state, partNum) => {
    if (!(partNum in state.elements.elementsForPart)) {
        return [];
    }
    return state.elements.elementsForPart[partNum].elements.map(entityId => (
        state.elements.entities[entityId]
    ));
};

// side effects
export const fetchElementsForPart = (partNum) => {
    return (dispatch) => {
        dispatch(requestElementsForPart(partNum));
        return fetch(getApiUrl() + '/elements?part=' + partNum)
            .then(
                response => response.json(),
                error => console.log('An error occurred', error)
            )
            .then(
                responseJson => dispatch(receiveElementsForPart(partNum, responseJson.results))
            );
    }
};
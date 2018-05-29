import {isError} from 'flux-standard-action';

// action types
const LOAD_REQUEST = 'lego/parts/LOAD_REQUEST';
const LOAD_RESPONSE = 'lego/parts/LOAD_RESPONSE';

initialState = {
    byPartNum: {},
    partNums: [],
    requesting: false,
    error: null

};

// reducer
export default function reducer(state = {}, action = {}) {
    switch(action.type) {
        case LOAD_REQUEST:
            return Object.assign({}, state, {requesting: true});
        case LOAD_RESPONSE:
            if (isError(action)) {
                const newState = {error: action.payload};
            } else {
                const newState = {}
            }
        default:
            return state;
    }
}
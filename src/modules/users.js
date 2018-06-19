import {addAuthTokenToRequest, loggedIn} from '../api/authApi';
import {getApiUrl} from "../config";
import {handleErrors} from "../api/helpers";

// Actions
export const LOAD_LOGGED_IN_USER_REQUEST = 'lego/logged-in-user/LOAD_REQUEST';
export const LOAD_LOGGED_IN_USER_SUCCESS = 'lego/logged-in-user/LOAD_SUCCESS';
export const LOAD_LOGGED_IN_USER_FAIL = 'lego/logged-in-user/LOAD_FAIL';


// Reducer
const initialState = {
    loading: false,
    user: undefined
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LOGGED_IN_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            };
        case LOAD_LOGGED_IN_USER_REQUEST:
            return {
                loading: true,
                user: undefined
            };
        default:
            return state;
    }
};
export default reducer;

// ActionCreators
const receiveLoggedInUser = user =>  {
    return {
        type: LOAD_LOGGED_IN_USER_SUCCESS,
        payload: user
    }
};

const loggedInUserFailed = () => {
    return {
        type: LOAD_LOGGED_IN_USER_FAIL,
        payload: {}
    }
};

const requestLoggedInUser = () =>  {
    return {
        type: LOAD_LOGGED_IN_USER_REQUEST,
        payload: {}
    }
};

// Selectors
export const getLoggedInUser = state => state.loggedInUser.user;
export const isLoadingLoggedInUser = state => state.loggedInUser.loading;

// Side Effects
export const fetchLoggedInUser = state => () => {
    if (isLoadingLoggedInUser(state)) {
        return Promise.resolve();
    }

    return (dispatch) => {
        dispatch(requestLoggedInUser());

        if (!loggedIn()) {
            dispatch(loggedInUserFailed());
        }
        const url = getApiUrl() + '/users/me?details=1';
        return fetch(url, addAuthTokenToRequest({}))
            .then(handleErrors)
            .then(response => response.json())
            .then(response => dispatch(receiveLoggedInUser(response)))
            .catch(error => {
                console.log('An error occurred', error);
                dispatch(loggedInUserFailed());
            });
    };
};
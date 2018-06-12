import {getApiUrl} from '../config';
import deepCopy from 'deep-copy';

const getAuthenticatedTokenCallbackObject = token => ({
    authenticated: true,
    token: token !== undefined ? token : localStorage.authToken
});

// getToken retrieves an existent token from local storage; this _basically_ assumes
// the user is already logged in
export const getToken = () => {
    return localStorage.authToken;
};

export const addAuthTokenToRequest = request => {
    const newRequest = deepCopy(request);
    if (loggedIn()) {
        if (newRequest.headers === undefined) {
            newRequest.headers = {};
        }
        newRequest.headers['Authorization'] = 'Token ' + getToken();
    }
    return newRequest;
};

// fetchToken potentially makes a server round trip to retrieve a token
const fetchToken = (username, password, callback) => {
    if (loggedIn()) {
        callback(getAuthenticatedTokenCallbackObject(getToken()));
        return;
    }

    const url = getApiUrl() + '/auth-token/';
    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(
        response => {
            if (response.status >= 400 && response.status < 600) {
                throw new Error("Error received from server: [" + response.statusText + "]");
            }
            return response.json();
        }
    ).then(
        responseJson => callback(getAuthenticatedTokenCallbackObject(responseJson.token)),
        error => console.log(error)
    );
};

export const login = (username, password, callback) => {
    if (localStorage.authToken !== undefined) {
        if (callback) {
            callback(true);
        }
        return;
    }
    fetchToken(username, password, (response) => {
        let authSuccess = false;
        if (response.authenticated) {
            localStorage.authToken = response.token;
            authSuccess = true;
        }
        if (callback) {
            callback(authSuccess);
        }
    });
};

export const logout = () => {
    delete localStorage.authToken;
};

export const loggedIn = () => {
    return !! getToken();
};

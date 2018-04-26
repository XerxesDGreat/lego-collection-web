import axios from 'axios'

const cache = {};

function rememberCall(key, operation) {
    if (!(key in cache)) {
        //operation().then((resp) => )
        const value = operation();
        cache[key] = value;
    }
    return cache[key];
}

export function getAllSets() {
    return axios.get("http://localhost:8888/sets");
}

export function updateSetOnDisplay(setNum, onDisplay=true) {
    const data = {'on_display': onDisplay};
    return axios.put("http://localhost:8888/sets/" + setNum, data);
}

export function getAllParts() {
    return axios.get("http://localhost:8888/parts");
}
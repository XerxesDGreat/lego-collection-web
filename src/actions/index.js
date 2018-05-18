import {ADD_PART} from './/action-types';

export const addPart = part => ({type: ADD_PART, payload: part});

export function loadParts() {
    return function(dispatch) {
        return partApi.getAllParts().then(parts => {
            dispatch(loadPartsSuccess(parts));
        }).catch(error => {
            throw(error);
        })
    }

}
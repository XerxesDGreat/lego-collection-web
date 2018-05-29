import * as partApi from '../api/partApi';
import * as types from "./actionTypes";
import {partsPaginator} from "../paginators";

////////////////////////////////////////////
// One part
////////////////////////////////////////////
export function fetchPartById(partId) {
    return function(dispatch) {
        dispatch(requestPartForId(partId));
        return partApi.getPartForId(partId)
            .then(
                response => response.data,
                error => console.log('An error occurred', error)
            ).then(
                data => dispatch(receivePartForId(partId, data))
            )
    }
}

function receivePartForId(partId, part) {
    return {
        type: types.LOAD_PART_FOR_ID_SUCCESS,
        part: part,
        partId: partId
    }
}

function requestPartForId(partId) {
    return {
        type: types.LOAD_PART_FOR_ID_REQUEST,
        partId: partId
    }
}


////////////////////////////////////////////
// All Parts
////////////////////////////////////////////
export function fetchParts(filters = {}) {
    return function(dispatch) {
        dispatch(requestParts(filters));
        return partApi.getParts(filters)
            .then(
                response => dispatch(receiveParts(response, filters)),
                error => console.log('An error occurred', error)
            )
    }
}

function requestParts(filters) {
    return {
        type: types.LOAD_PARTS_REQUEST,
        filters: filters
    }
}

function receiveParts(response, filters) {
    return {
        type: types.LOAD_PARTS_SUCCESS,
        parts: response.results,
        next: response.next,
        filters: filters,
        count: response.count,
        previous: response.prev
    }
}

export const requestPartsPage = partsPaginator.parts.requestPage;
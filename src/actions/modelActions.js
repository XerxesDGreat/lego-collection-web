import modelApi from '../api/modelApi';
import {LOAD_MODELS_SUCCESS} from "./actionTypes";

export function loadModels() {
    return function(dispatch) {
        return modelApi.getAllModels().then(models => {
            dispatch(loadModelsSuccess(models['data']));
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadModelsSuccess(models) {
    return {type: LOAD_MODELS_SUCCESS, models};
}
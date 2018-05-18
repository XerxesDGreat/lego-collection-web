import {combineReducers} from 'redux';
import models from './modelReducer';
import partCategories from './partCategoryReducer';

const rootReducer = combineReducers({
    models,
    partCategories
});

export default rootReducer;
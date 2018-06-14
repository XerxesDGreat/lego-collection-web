import {combineReducers} from 'redux';
import models from './modelReducer';
import partCategories from './partCategoryReducer';
import loggedInUser from '../modules/users';
import {partsPaginator} from "../paginators";
import currentPart from '../modules/currentPart';
import elements from '../modules/elements';

const parts = combineReducers({
    entities: partsPaginator.entitiesReducer,
    pagination: partsPaginator.paginationReducer,
    currentPart
});

const rootReducer = combineReducers({
    models,
    partCategories,
    parts,
    loggedInUser,
    elements
});

export default rootReducer;
import {combineReducers} from 'redux';
import models from './modelReducer';
import partCategories from './partCategoryReducer';
import loggedInUser from '../modules/users';
import parts from '../modules/parts';
import elements from '../modules/elements';
import userElements from '../modules/userElements';
import userParts from '../modules/userParts';

const rootReducer = combineReducers({
    models,
    partCategories,
    parts,
    loggedInUser,
    elements,
    userElements,
    userParts
});

export default rootReducer;
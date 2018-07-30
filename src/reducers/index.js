import {combineReducers} from 'redux';
import partCategories from './partCategoryReducer';
import loggedInUser from '../modules/users';
import parts from '../modules/parts';
import elements from '../modules/elements';
import userElements from '../modules/userElements';
import userParts from '../modules/userParts';
import sets from '../modules/sets';

const rootReducer = combineReducers({
    partCategories,
    parts,
    loggedInUser,
    elements,
    userElements,
    userParts,
    sets
});

export default rootReducer;
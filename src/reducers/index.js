import {combineReducers} from 'redux';
import models from './modelReducer';
import partCategories from './partCategoryReducer';
import parts from './partReducer';
import currentPart from './currentPartReducer';
import {partsPaginator} from "../paginators";

const rootReducer = combineReducers({
    models,
    partCategories,
    parts,
    currentPart,
    entities: {},
    pagination: partsPaginator.reducers
});

export default rootReducer;
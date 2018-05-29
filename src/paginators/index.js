import {createPaginator} from 'redux-paginator';
import {getApiUrl} from "../config";

export const partsPaginator = createPaginator(
    getApiUrl() + '/parts',
    ['parts'],
    {
        pageArgName: 'page',
        resultsKey: 'results',
        countKey: 'count'
    }
);
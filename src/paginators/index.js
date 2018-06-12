import getPaginator from 'paging-dr-redux';
import {getParts} from "../api/partApi";

export const partsPaginator = getPaginator(getParts, {
    entityIdKey: 'part_num'
});
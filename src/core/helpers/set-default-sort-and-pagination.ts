import {PaginationAndSorting} from "../types/pagination-and-sorting";
import {paginationAndSortingDefault} from "../validation/query-pagination-sorting";

export function setDefaultSortAndPaginationIfNotExist<P = string>(
    query: Partial<PaginationAndSorting<P>>,
): PaginationAndSorting<P>{
    console.log('📦 Вход в setDefaults:', query);
    const result = {
        ...paginationAndSortingDefault,
        ...query,
        sortBy: (query.sortBy ?? paginationAndSortingDefault.sortBy) as P,
    }
    console.log('📦 Выход из setDefaults:', result);
    return result;
}


import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";
import {PostSortField} from "../../posts/input/post-sort-field";
import {UserSortField} from "./user-sort-field";

export type UserQueryInput = PaginationAndSorting<UserSortField> &
    Partial<{
        searchUserTitleTerm: string;
    }>
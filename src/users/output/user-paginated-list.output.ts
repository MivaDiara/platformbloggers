import {UserDataOutput} from "./user.data.output";

export type UserPaginatedListOutput = {
    page: number,
    pageSize: number,
    pagesCount: number,
    totalCount: number,
    items: UserDataOutput[];
}
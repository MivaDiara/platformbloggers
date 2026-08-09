import {PaginatedOutput} from "../../../core/types/paginated.output";
import {PostDataOutput} from "./post-data.output";

export type PostsListPaginateOutput = {
    page: number,
    pageSize: number,
    pagesCount: number,
    totalCount: number,
    items: PostDataOutput[];
}
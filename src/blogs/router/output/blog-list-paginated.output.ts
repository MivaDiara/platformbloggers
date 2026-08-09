import {PaginatedOutput} from "../../../core/types/paginated.output";
import {BlogDataOutput} from "./blog-data.output";

export type BlogListPaginateOutput = {
    page: number,
    pageSize: number,
    pagesCount: number,
    totalCount: number,
    items: BlogDataOutput[];
}
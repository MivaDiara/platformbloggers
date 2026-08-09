import {WithId} from 'mongodb';
import {BlogsType} from "../../types/blogs";
import {ResourceType} from "../../../core/types/resource-type";
import {BlogListPaginateOutput} from "../output/blog-list-paginated.output";
import {BlogDataOutput} from "../output/blog-data.output";


export function mapToBlogListPaginatedOutput(blogs: WithId<BlogsType>[],
                                             meta: {pageNumber: number, pageSize: number, totalCount: number}): BlogListPaginateOutput {
    return {
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        pagesCount: Math.ceil(meta.totalCount/meta.pageSize),
        totalCount: meta.totalCount,
        items: blogs.map(
            (blog): BlogDataOutput => ({
                id: blog._id.toString(),
                name: blog.name,
                websiteUrl: blog.websiteUrl,
                description: blog.description,
                createdAt: blog.createdAt,
                isMembership: blog.isMemberShip
            })
        )
    };
}
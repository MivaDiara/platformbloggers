import {WithId} from 'mongodb';
import {BlogsType} from "../../types/blogs";
import {ResourceType} from "../../../core/types/resource-type";
import {BlogListPaginateOutput} from "../output/blog-list-paginated.output";
import {BlogDataOutput} from "../output/blog-data.output";


export function mapToBlogListPaginatedOutput(blogs: WithId<BlogsType>[],
                                             meta: {pageNumber: number, pageSize: number, totalCount: number}): BlogListPaginateOutput {
    return {
        meta: {
            page: meta.pageNumber,
            pageSize: meta.pageSize,
            pageCount: Math.ceil(meta.totalCount/meta.pageSize),
            totalCount: meta.totalCount
        },
        data: blogs.map(
            (blog): BlogDataOutput => ({
                type: ResourceType.Blogs,
                id: blog._id.toString(),
                attributes: {
                    name: blog.name,
                    websiteUrl: blog.websiteUrl,
                    description: blog.description,
                    createdAt: blog.createdAt,
                    isMembership: blog.isMemberShip
                }
            })
        )
    };
}
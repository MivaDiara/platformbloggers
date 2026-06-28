import {WithId} from 'mongodb';
import {PostsType} from "../types/posts";
import {PostsListPaginateOutput} from "../routes/output/post-list-paginated.output";
import {PostDataOutput} from "../routes/output/post-data.output";
import {ResourceType} from "../../core/types/resource-type";



export function mapToPostListPaginatedOutput(posts: WithId<PostsType>[],
                                             meta: {pageNumber: number, pageSize: number, totalCount: number}): PostsListPaginateOutput {
    return {
        meta: {
            page: meta.pageNumber,
            pageSize: meta.pageSize,
            pageCount: Math.ceil(meta.totalCount/meta.pageSize),
            totalCount: meta.totalCount
        },
        data: posts.map(
            (post): PostDataOutput => ({
                type: ResourceType.Posts,
                id: post._id.toString(),
                attributes: {
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    createdAt: post.createdAt,
                    blogId: post.blogId,
                    blogName: post.blogName,
                }
            })
        )
    };
}
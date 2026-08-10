
import {WithId} from "mongodb";

import {PostsType} from "../types/posts";
import {ResourceType} from "../../core/types/resource-type";
import {PostOutput} from "../routes/output/post.output";

export function mapToPostOutput(post: WithId<PostsType>): PostOutput {
    return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
    }
}
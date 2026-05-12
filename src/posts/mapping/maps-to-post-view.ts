import {WithId} from "mongodb";
import {PostsType} from "../types/posts";
import {postViewModel} from "../types/posts.view.model";

export function mapToPostViewModel(post: WithId<PostsType>): postViewModel{
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName
    }
}
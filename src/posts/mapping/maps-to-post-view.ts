import {WithId} from "mongodb";
import {PostsType} from "../types/posts";
import {postViewModel} from "../types/posts.view.model";
import {BlogsType} from "../../blogs/types/blogs";

export function mapToPostViewModel(post: WithId<PostsType>, blog: WithId<BlogsType>): postViewModel{
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: blog?.name || 'Blog not found'
    }
}
import {BlogsType} from "../types/blogs";
import {WithId} from "mongodb";
import {blogViewModel} from "../types/blog.view.model";

export function mapToBlogViewModel(blog: WithId<BlogsType>): blogViewModel{
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt
    }
}
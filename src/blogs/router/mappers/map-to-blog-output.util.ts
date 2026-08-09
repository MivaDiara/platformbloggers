import {BlogsType} from "../../types/blogs";
import {BlogOutput} from "../output/blog.output";
import {WithId} from "mongodb";
import {ResourceType} from "../../../core/types/resource-type";

export function mapToBlogOutput(blog: WithId<BlogsType>): BlogOutput{
    return {
            id: blog._id.toString(),
            name: blog.name,
            websiteUrl: blog.websiteUrl,
            isMembership: blog.isMemberShip,
            description: blog.description,
            createdAt: blog.createdAt,
    }
}
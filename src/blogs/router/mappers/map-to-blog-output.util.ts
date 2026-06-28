import {BlogsType} from "../../types/blogs";
import {BlogOutput} from "../output/blog.output";
import {WithId} from "mongodb";
import {ResourceType} from "../../../core/types/resource-type";

export function mapToBlogOutput(blog: WithId<BlogsType>): BlogOutput{
    return {
        data:{
            type: ResourceType.Blogs,
            id: blog._id.toString(),
            attributes: {
                name: blog.name,
                websiteUrl: blog.websiteUrl,
                isMembership: blog.isMemberShip,
                description: blog.description,
                createdAt: blog.createdAt,
            }

        }
    }
}
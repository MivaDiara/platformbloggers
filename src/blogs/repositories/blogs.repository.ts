import {BlogsType} from "../types/blogs";
import {blogsCollection} from "../../db/db";
import {BlogsInputDTO} from "../dto/blogs.input-dto";
import {WithId, ObjectId} from "mongodb";

export const BlogsRepository = {
    async create(newBlog: BlogsType): Promise<string> {
            const insertBlog = await blogsCollection.insertOne(newBlog);
            return insertBlog.insertedId.toString();
        },
    async update(id: string, dto: BlogsInputDTO): Promise<void> {
        const updatedBlog = await blogsCollection.updateOne({

            _id: new ObjectId(id),
        },
            {
                $set:{
                    name: dto.name,
                    description: dto.description,
                    websiteUrl: dto.websiteUrl
                }
            })
        if (updatedBlog.matchedCount < 1) {
            throw new Error('Blog not exist');
        }
        return;
    },
    async delete(id: string): Promise<void> {
        const deletedBlog = await blogsCollection.deleteOne({_id: new ObjectId(id)});
        if (deletedBlog.deletedCount < 1){
            throw new Error('Blog not deleted');
        }
        return
    }
}
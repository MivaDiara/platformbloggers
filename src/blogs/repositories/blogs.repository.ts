import {BlogsType} from "../types/blogs";
import {blogsCollection} from "../../db/db";
import {BlogsInputDTO} from "../dto/blogs.input-dto";
import {WithId, ObjectId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found-error";
import {BlogQueryInput} from "../input/blog-query.input";


export const BlogsRepository = {
    async findAll(queryDto: BlogQueryInput): Promise<{items: WithId<BlogsType>[]; totalCount: number}> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchBlogNameTerm
        } = queryDto
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchBlogNameTerm){
            filter.$or = [];
            if (searchBlogNameTerm){
                filter.$or.push({"name":{"$regex": `${searchBlogNameTerm}`, "$options":"i"}});
            }
        }
        const items = await blogsCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await blogsCollection.countDocuments(filter);
        return {items, totalCount};
    },
    async findByID(id: string): Promise<WithId<BlogsType> | null> {
        return blogsCollection.findOne({_id: new ObjectId(id)});
    },
    async findByIdOrFail(id: string): Promise<WithId<BlogsType> | null> {
        const res = blogsCollection.findOne({_id: new ObjectId(id)});
        if (!res){
            throw new RepositoryNotFoundError("Blog is not exist")
        }
        return res;
    },
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
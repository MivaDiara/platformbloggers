import {BlogQueryInput} from "../input/blog-query.input";
import {ObjectId, WithId} from "mongodb";
import {BlogsType} from "../types/blogs";
import {blogsCollection} from "../../db/db";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found-error";


export const blogsQueryRepository = {
    async findAll(queryDto: BlogQueryInput): Promise<{items: WithId<BlogsType>[]; totalCount: number}> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm
        } = queryDto
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchNameTerm){
            filter.$or = [];
            if (searchNameTerm){
                filter.$or.push({"name":{"$regex": `${searchNameTerm}`, "$options":"i"}});
            }
        }
        console.log('🔍 searchNameTerm:', searchNameTerm);
        const items = await blogsCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await blogsCollection.countDocuments(filter);
        return {items, totalCount};
    },
    async findByIdOrFail(id: string): Promise<WithId<BlogsType> | null> {
        const res = await blogsCollection.findOne({_id: new ObjectId(id)});
        if (!res){
            throw new RepositoryNotFoundError("Blog is not exist")
        }
        return res;
    },
}
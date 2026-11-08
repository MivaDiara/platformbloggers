import {PostQueryInput} from "../input/post-query.input";
import {ObjectId, WithId} from "mongodb";
import {PostsType} from "../types/posts";
import {postsRepository} from "./posts.repository";
import {postCollection} from "../../db/db";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found-error";

export const postsQueryRepository = {
    async findAll(queryDto: PostQueryInput): Promise<{items: WithId<PostsType>[], totalCount: number}>{
        console.log('📦 Весь queryDto:', queryDto);
        console.log('📦 sortBy в репозитории:', queryDto.sortBy);
        console.log('📦 sortDirection:', queryDto.sortDirection);
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchPostTitleTerm
        } = queryDto;
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};
        if (searchPostTitleTerm){
            filter.$or = [];
            if (searchPostTitleTerm){
                filter.$or.push({ "title": { "$regex": `${searchPostTitleTerm}`, "$options": "i" } });
            }
        }
        const items = await postCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await postCollection.countDocuments(filter);
        return {items, totalCount};
    },
    async findByIdOrFail(id: string): Promise<WithId<PostsType> | null> {
        const res = await postCollection.findOne({_id: new ObjectId(id)});
        if (!res){
            throw new RepositoryNotFoundError("Post doesnt exist");
        }
        return res;
    },
    async findAllInBlog(blogId: string, queryDto: PostQueryInput): Promise<{items: WithId<PostsType>[], totalCount: number}>{
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchPostTitleTerm
        } = queryDto;
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {blogId};
        if (searchPostTitleTerm){
            filter.$or = [];
            if (searchPostTitleTerm){
                filter.$or.push({ "title": { "$regex": `${searchPostTitleTerm}`, "$options": "i" } });
            }
        }
        const items = await postCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await postCollection.countDocuments(filter);
        return {items, totalCount};
    }
}
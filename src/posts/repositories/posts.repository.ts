import {PostsInputDTO} from "../dto/posts.input-dto";
import {PostsType} from "../types/posts";
import {postCollection} from "../../db/db";
import { ObjectId, WithId } from 'mongodb';
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found-error";
import {PostQueryInput} from "../input/post-query.input";


export const postsRepository = {
    async findAll(queryDto: PostQueryInput): Promise<{items: WithId<PostsType>[], totalCount: number}>{
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
    async findById(id: string): Promise<WithId<PostsType> | null> {
        return postCollection.findOne({_id: new ObjectId(id)});
    },
    async findByIdOrFail(id: string): Promise<WithId<PostsType> | null> {
        const res = await postCollection.findOne({_id: new ObjectId(id)});
        if (!res){
            throw new RepositoryNotFoundError("Post doesnt exist");
        }
        return res;
    },
    async findAllInBlogs(blogId: string): Promise<WithId<PostsType>[]>{
        const filter = {blogId: blogId};
        return postCollection.find(filter).toArray();
},
    async create(newPost: PostsType): Promise<string> {
        const insertResult = await postCollection.insertOne(newPost);
        return insertResult.insertedId.toString();
    },
    async update(id: string, dto: PostsInputDTO): Promise<void>{
        const updatedPost = await postCollection.updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: {
                    title: dto.title,
                    content: dto.content,
                    shortDescription: dto.shortDescription,
                    blogId: dto.blogId
                }
            }
        );
        if (updatedPost.matchedCount < 1) {
            throw new Error('No such post');
        }
        return;
    },
    async delete(id: string): Promise<void>{
        const deletedPost = await postCollection.deleteOne({_id: new ObjectId(id)});
        if (deletedPost.deletedCount < 1){
            throw new Error('No such post');
        }
        return
    }
};
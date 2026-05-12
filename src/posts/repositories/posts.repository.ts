import {PostsInputDTO} from "../dto/posts.input-dto";
import {PostsType} from "../types/posts";
import {postCollection} from "../../db/db";
import { ObjectId, WithId } from 'mongodb';


export const postsRepository = {
    async findAll(): Promise<WithId<PostsType>[]>{
        return postCollection.find().toArray();
    },
    async findById(id: string): Promise<WithId<PostsType> | null> {
        return postCollection.findOne({_id: new ObjectId(id)});
    },
    async create(newPost: PostsType): Promise<WithId<PostsType>> {
        const insertResult = await postCollection.insertOne(newPost);
        return { ...newPost, _id: insertResult.insertedId};
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
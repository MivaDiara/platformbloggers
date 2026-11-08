import {Request, Response} from "express";
import {usersCollection} from "../../db/db";
import {ObjectId, WithId} from "mongodb";
import {PostsType} from "../../posts/types/posts";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found-error";
import {UsersType} from "../types/users";
import {mapToUserOutput} from "../mappers/map-to-user-output";
import {UserQueryInput} from "../input/user-query.input";

export const usersQueryRepository ={
    async findAll(queryDto: UserQueryInput): Promise<{items: WithId<UsersType>[], totalCount: number}>{
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchUserTitleTerm
        } = queryDto;
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};
        if (searchUserTitleTerm) {
            filter.$or = [];
            if (searchUserTitleTerm) {
                filter.$or.push({"login": {"$regex": `${searchUserTitleTerm}`, "options": "i"}});
            }
        }
        const items = await usersCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await usersCollection.countDocuments(filter);
        return {items, totalCount};
    },
    async findById(id: string): Promise<WithId<UsersType> | null>{
        const res = await usersCollection.findOne({_id: new ObjectId(id)});
        if (!res) {
            throw  new RepositoryNotFoundError("User doesnt exist");
        }
        return res;
    }
}
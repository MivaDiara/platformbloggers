import {UsersType} from "../types/users";
import {ObjectId, WithId} from "mongodb";
import {usersQueryRepository} from "./query.repository";
import {usersCollection} from "../../db/db";

export const usersRepository = {
    async create(newUser: UsersType): Promise<string>{
        const insertResult = await usersCollection.insertOne(newUser);
        return insertResult.insertedId.toString();
    },
    async delete(id: string): Promise<void>{
        const deletedUser = await usersCollection.deleteOne({_id: new ObjectId(id)});
        if (deletedUser.deletedCount < 1) {
            throw new Error("No such user");
        }
        return
    },
    async isEmail(email: string): Promise<boolean>{
        const count = await usersCollection.countDocuments({email});
        return count > 0
    },
    async isLogin(login: string): Promise<boolean>{
        const count = await usersCollection.countDocuments({login});
        return count > 0
    }
}
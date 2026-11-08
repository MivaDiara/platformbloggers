import {UsersType} from "../types/users";
import {WithId} from "mongodb";
import {UserOutput} from "../output/user.output";

export function mapToUserOutput(user: WithId<UsersType>): UserOutput {
    return {
        id: user._id.toString(),
        email: user.email,
        login: user.login,
        createdAt: user.createdAt,
    }
}
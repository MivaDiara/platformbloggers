import {WithId} from "mongodb";
import {UsersType} from "../types/users";
import {UserPaginatedListOutput} from "../output/user-paginated-list.output";
import {UserDataOutput} from "../output/user.data.output";

export function mapToUserslistOutput(users: WithId<UsersType>[],
                                     meta: {pageNumber: number, pageSize: number, totalCount: number}): UserPaginatedListOutput {
    return {
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        pagesCount: Math.ceil(meta.totalCount/meta.pageSize),
        totalCount: meta.totalCount,
        items: users.map(
            (user): UserDataOutput => ({
                id: user._id.toString(),
                email: user.email,
                login: user.login,
                createdAt:user.createdAt,
    })
        )
    }

}
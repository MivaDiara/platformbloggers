import {Response, Request} from "express";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {usersQueryRepository} from "../../repositories/query.repository";
import {matchedData} from "express-validator";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {UserSortField} from "../../input/user-sort-field";
import {usersCollection} from "../../../db/db";
import {mapToUserslistOutput} from "../../mappers/map-to-userslist-output";

export async function getUsersHandler(req: Request, res: Response) {
    try {
        const sanitizedQuery = matchedData(req, {
            locations: ['query'],
            includeOptionals: true,
        });
        const queryInput = setDefaultSortAndPaginationIfNotExist<UserSortField>(sanitizedQuery);
        const {items, totalCount} = await usersQueryRepository.findAll(queryInput);
        const userListOutput = mapToUserslistOutput(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount
        })
        res.status(HTTPStatus.OK).json(userListOutput);
    }
    catch (error) {
        res.send(error);
    }

}
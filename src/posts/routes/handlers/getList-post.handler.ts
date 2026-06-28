import {Request, Response} from "express";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {postsService} from "../../application/posts.service";
import {matchedData} from "express-validator";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {PostSortField} from "../../input/post-sort-field";
import {mapToPostListPaginatedOutput} from "../../mappers/map-to-post-list-paginated-output.util";

export async function getListsPostHandler(req: Request, res: Response) {
    try{
        const sanitizedQuery = matchedData(req, {
            locations: ['query'],
            includeOptionals: true,
        });
        const queryInput = setDefaultSortAndPaginationIfNotExist<PostSortField>(sanitizedQuery);
        const {items, totalCount} = await postsService.findMany(queryInput);
        const postLostOutput = mapToPostListPaginatedOutput(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount
        })
        res.status(HTTPStatus.OK).send(postLostOutput);
    }
    catch(error){
        res.sendStatus(HTTPStatus.NOT_FOUND);
    }
}
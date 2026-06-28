import {Request, Response, NextFunction} from 'express';
import {blogsService} from "../../application/blogs.service";
import {mapToPostViewModel} from "../../../posts/mapping/maps-to-post-view";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {matchedData} from "express-validator";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {PostSortField} from "../../../posts/input/post-sort-field";
import {postsService} from "../../../posts/application/posts.service";
import {mapToPostListPaginatedOutput} from "../../../posts/mappers/map-to-post-list-paginated-output.util";

export async function getPostsInBlogHandler(req: Request, res: Response){
    const sanitizedQuery = matchedData(req,{
        locations: ['query'],
        includeOptionals: true,
    });
    const queryInput = setDefaultSortAndPaginationIfNotExist<PostSortField>(sanitizedQuery);
    const {items, totalCount} = await postsService.findMany(queryInput);
    const postListOutput = mapToPostListPaginatedOutput(items, {
        pageNumber: queryInput.pageNumber,
        pageSize: queryInput.pageSize,
        totalCount
    });
    res.status(HTTPStatus.OK).send(postListOutput);
}
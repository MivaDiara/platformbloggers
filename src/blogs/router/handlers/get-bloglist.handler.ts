import {Response, Request} from 'express';
import {BlogsRepository} from "../../repositories/blogs.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {mapToBlogViewModel} from "../../mapping/maps-to-blogs-to-view";
import {blogsService} from "../../application/blogs.service";
import {BlogQueryInput} from "../../input/blog-query.input";
import {matchedData} from "express-validator";
import {
    setDefaultSortAndPaginationIfNotExist
} from "../../../core/helpers/set-default-sort-and-pagination";
import {BlogSortField} from "../../input/blog-sort-field";
import {mapToBlogListPaginatedOutput} from "../mappers/map-to-blog-list-paginated-output.util";


export async function getBlogListHandler(
    req: Request<{}, {}, {}, BlogQueryInput>, res: Response
){
    try{
        const sanitizedQuery = matchedData(req, {
            locations: ['query'],
            includeOptionals: true,
        });
        const queryInput = setDefaultSortAndPaginationIfNotExist<BlogSortField>(sanitizedQuery);
        const {items, totalCount} = await blogsService.findMany(queryInput);
        const  blogListOutput = mapToBlogListPaginatedOutput(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
        });

        res.status(HTTPStatus.OK).send(blogListOutput);
    }
    catch(error){
        res.sendStatus(HTTPStatus.NOT_FOUND);
    }
}
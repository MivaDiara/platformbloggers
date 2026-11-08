import {Request, Response, NextFunction} from 'express';
import {blogsService} from "../../application/blogs.service";
import {mapToPostViewModel} from "../../../posts/mapping/maps-to-post-view";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {matchedData} from "express-validator";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {PostSortField} from "../../../posts/input/post-sort-field";
import {postsService} from "../../../posts/application/posts.service";
import {mapToPostListPaginatedOutput} from "../../../posts/mappers/map-to-post-list-paginated-output.util";
import {BlogsRepository} from "../../repositories/blogs.repository";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found-error";
import {blogsQueryRepository} from "../../repositories/query.repository";
import {postsQueryRepository} from "../../../posts/repositories/query.reporitory";

export async function getPostsInBlogHandler(req: Request, res: Response){
    try{
        const  id  = req.params.id as string;
        await blogsQueryRepository.findByIdOrFail(id);
        const sanitizedQuery = matchedData(req,{
            locations: ['query'],
            includeOptionals: true,
        });
        const queryInput = setDefaultSortAndPaginationIfNotExist<PostSortField>(sanitizedQuery);
        const {items, totalCount} = await postsQueryRepository.findAllInBlog(id, queryInput);
        const postListOutput = mapToPostListPaginatedOutput(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount
        });
        res.status(HTTPStatus.OK).send(postListOutput);
    }
    catch(err){
        if(err instanceof RepositoryNotFoundError) {
            res.status(HTTPStatus.NOT_FOUND).send({error: err});
        }
        else{
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(`${err}`);
        }
    }
}
import {NextFunction, Request, Response} from "express";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsInputDTO} from "../../dto/blogs.input-dto";
import {mapToBlogViewModel} from "../../mapping/maps-to-blogs-to-view";
import {blogsService} from "../../application/blogs.service";
import {blogsQueryRepository} from "../../repositories/query.repository";

export async function createBlogHandler(
    req: Request<{}, {}, BlogsInputDTO>, res: Response, next: NextFunction
){
    try{
        const createdBlogId = await blogsService.create(req.body);
        const createdBlog = await blogsQueryRepository.findByIdOrFail(createdBlogId);
        const blogViewModel = mapToBlogViewModel(createdBlog!);
        res.status(HTTPStatus.CREATED).send(blogViewModel);
    }
    catch(error){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}
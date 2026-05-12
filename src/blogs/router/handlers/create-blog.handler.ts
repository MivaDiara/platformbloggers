import {NextFunction, Request, Response} from "express";
import {BlogsType} from "../../types/blogs";
import {BlogsRepository} from "../../repositories/blogs.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsInputDTO} from "../../dto/blogs.input-dto";
import {mapToBlogViewModel} from "../../mapping/maps-to-blogs-to-view";

export async function createBlogHandler(
    req: Request<{}, {}, BlogsInputDTO>, res: Response, next: NextFunction
){
    try{
        const newBlog: BlogsType = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }
        const createdBlog = await BlogsRepository.create(newBlog);
        const blogViewModel = mapToBlogViewModel(createdBlog);
        res.status(HTTPStatus.CREATED).send(blogViewModel);
    }
    catch(error){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}
import {Request, Response} from 'express';
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {mapToBlogViewModel} from "../../mapping/maps-to-blogs-to-view";
import {blogsService} from "../../application/blogs.service";
import {mapToBlogOutput} from "../mappers/map-to-blog-output.util";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found-error";
import {blogsQueryRepository} from "../../repositories/query.repository";

export async function getBlogHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const blog = await blogsQueryRepository.findByIdOrFail(id);
        const blogViewModel = mapToBlogOutput(blog!);
        res.send(blogViewModel);
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
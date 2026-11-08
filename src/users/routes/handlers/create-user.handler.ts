import {postsService} from "../../../posts/application/posts.service";
import {usersService} from "../../application/users.service";
import {Request, Response} from "express";
import {usersQueryRepository} from "../../repositories/query.repository";
import {mapToUserOutput} from "../../mappers/map-to-user-output";
import {HTTPStatus} from "../../../core/types/HTTPStatus";

export async function createUserHandler(req: Request, res: Response) {
    try{
        const createdUserId = await usersService.create(req.body);
        const createdUser = await usersQueryRepository.findById(createdUserId);
        const userViewModel = mapToUserOutput(createdUser!);
        res.status(HTTPStatus.CREATED).send(userViewModel);

    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message }); // ← .message!
        } else {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
}
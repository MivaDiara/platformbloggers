import {Request, Response} from "express";
import {usersRepository} from "../../repositories/users.repository";
import {usersQueryRepository} from "../../repositories/query.repository";
import {mapToPostViewModel} from "../../../posts/mapping/maps-to-post-view";
import {mapToUserOutput} from "../../mappers/map-to-user-output";
import {HTTPStatus} from "../../../core/types/HTTPStatus";

export async function getUserHandler(req: Request, res: Response) {
    const id = req.params.id.toString();
    const user = await usersQueryRepository.findById(id);
    const userMap = mapToUserOutput(user!);
    res.status(HTTPStatus.OK).json(userMap);
}
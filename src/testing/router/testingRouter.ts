import {Router, Request, Response} from "express";
import {db} from "../../db/db";
import {HTTPStatus} from "../../core/types/HTTPStatus";
export const testingRouter = Router();

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    db.blogs = [];
    db.posts = [];
    res.sendStatus(HTTPStatus.NO_CONTENT);
})
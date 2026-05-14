import {Router, Request, Response} from "express";
import {HTTPStatus} from "../../core/types/HTTPStatus";
import {blogsCollection, postCollection} from "../../db/db";
export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    await Promise.all([
        blogsCollection.deleteMany(),
        postCollection.deleteMany()
    ])
    res.sendStatus(HTTPStatus.NO_CONTENT);
})
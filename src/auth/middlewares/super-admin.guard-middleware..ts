import {Request, Response, NextFunction} from 'express';
import {HTTPStatus} from "../../core/types/HTTPStatus";

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'qwerty';

export const superAdminGuardMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string;
    if (!auth) {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
        return;
    }
    const [authType, token] = auth.split(' ');
    if(authType !== 'Basic') {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
        return;
    }
    const credentials = Buffer.from(token, "base64").toString('utf-8');
    const [username, password] = credentials.split(':');

    if(username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
        return;
    }
    next();
};
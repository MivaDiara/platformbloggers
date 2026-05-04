"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminGuardMiddleWare = exports.ADMIN_PASSWORD = exports.ADMIN_USERNAME = void 0;
const HTTPStatus_1 = require("../../core/types/HTTPStatus");
exports.ADMIN_USERNAME = 'admin';
exports.ADMIN_PASSWORD = 'qwerty';
const superAdminGuardMiddleWare = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.sendStatus(HTTPStatus_1.HTTPStatus.UNAUTHORIZED);
        return;
    }
    const [authType, token] = auth.split(' ');
    if (authType !== 'Basic') {
        res.sendStatus(HTTPStatus_1.HTTPStatus.UNAUTHORIZED);
        return;
    }
    const credentials = Buffer.from(token, "base64").toString('utf-8');
    const [username, password] = credentials.split(':');
    if (username !== exports.ADMIN_USERNAME || password !== exports.ADMIN_PASSWORD) {
        res.sendStatus(HTTPStatus_1.HTTPStatus.UNAUTHORIZED);
        return;
    }
    next();
};
exports.superAdminGuardMiddleWare = superAdminGuardMiddleWare;

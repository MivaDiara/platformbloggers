"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPStatus = void 0;
var HTTPStatus;
(function (HTTPStatus) {
    HTTPStatus[HTTPStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTPStatus[HTTPStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HTTPStatus[HTTPStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTPStatus[HTTPStatus["OK"] = 200] = "OK";
    HTTPStatus[HTTPStatus["CREATED"] = 201] = "CREATED";
    HTTPStatus[HTTPStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    HTTPStatus[HTTPStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTPStatus[HTTPStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HTTPStatus[HTTPStatus["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
})(HTTPStatus || (exports.HTTPStatus = HTTPStatus = {}));

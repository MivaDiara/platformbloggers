"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResultMiddleware = exports.createErrorMessages = void 0;
const express_validator_1 = require("express-validator");
const HTTPStatus_1 = require("../types/HTTPStatus");
const createErrorMessages = (errors) => {
    return {
        errorMessages: errors.map((error) => {
            var _a, _b;
            return ({
                status: error.status,
                detail: error.detail, //error message
                source: { pointer: (_a = error.source) !== null && _a !== void 0 ? _a : '' }, //error field
                code: (_b = error.code) !== null && _b !== void 0 ? _b : null, //domain error code
            });
        }),
    };
};
exports.createErrorMessages = createErrorMessages;
const formaValidationError = (error) => {
    const expressError = error;
    return {
        status: HTTPStatus_1.HTTPStatus.BAD_REQUEST,
        source: expressError.path,
        detail: expressError.msg,
    };
};
const inputValidationResultMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req)
        .formatWith(formaValidationError)
        .array({ onlyFirstError: true });
    if (errors.length > 0) {
        res.status(HTTPStatus_1.HTTPStatus.BAD_REQUEST).json((0, exports.createErrorMessages)(errors));
        return;
    }
    next();
};
exports.inputValidationResultMiddleware = inputValidationResultMiddleware;

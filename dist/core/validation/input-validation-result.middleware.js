"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResultMiddleware = void 0;
const express_validator_1 = require("express-validator");
const HTTPStatus_1 = require("../types/HTTPStatus");
const formatError = (error) => ({
    field: error.type,
    message: error.msg
});
const inputValidationResultMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(formatError).array();
    if (errors.length) {
        return res.status(HTTPStatus_1.HTTPStatus.BAD_REQUEST).json({ errorMessages: errors });
    }
    next();
};
exports.inputValidationResultMiddleware = inputValidationResultMiddleware;

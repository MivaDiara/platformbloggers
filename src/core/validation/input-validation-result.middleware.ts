import {validationResult, ValidationError} from "express-validator";
import {Request, Response, NextFunction} from "express";
import {HTTPStatus} from "../types/HTTPStatus";


const formatError = (error: ValidationError) => ({
    field: error.type,
    message: error.msg
});

export const inputValidationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(formatError).array();

    if (errors.length) {
        return res.status(HTTPStatus.BAD_REQUEST).json({errorMessages: errors});
    }
    next();
}
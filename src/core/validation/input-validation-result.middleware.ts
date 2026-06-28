import {
    FieldValidationError,
    ValidationError,
    validationResult,
} from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import {ValidationErrorType} from "../types/validationError";
import {ValidationErrorListOutput} from "../types/validayonError.dto";
import {HTTPStatus} from "../types/HTTPStatus";

export const createErrorMessages = (
    errors: ValidationErrorType[],
): ValidationErrorListOutput => {
    return {
        errorMessages: errors.map((error) => ({
            status: error.status,
            detail: error.detail, //error message
            source: { pointer: error.source ?? '' }, //error field
            code: error.code ?? null, //domain error code
        })),
    };
};

const formaValidationError = (error: ValidationError): ValidationErrorType => {
    const expressError = error as unknown as FieldValidationError;

    return {
        status: HTTPStatus.BAD_REQUEST,
        source: expressError.path,
        detail: expressError.msg,
    };
};

export const inputValidationResultMiddleware = (
    req: Request<{}, {}, {}, {}>,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req)
        .formatWith(formaValidationError)
        .array({ onlyFirstError: true });

    if (errors.length > 0) {
        res.status(HTTPStatus.BAD_REQUEST).json(createErrorMessages(errors));
        return;
    }
    next();
};
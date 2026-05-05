import {validationResult, ValidationError, FieldValidationError} from "express-validator";
import {Request, Response, NextFunction} from "express";
import {HTTPStatus} from "../types/HTTPStatus";
import {ValidationErrorType} from "../types/validationError";
import {ValidationErrorDto} from "../types/validayonError.dto";


export const createErrorMessages  = (errors: ValidationErrorType[]): ValidationErrorDto =>{
    return {errorMessages: errors};
}
const formatErrors = (error: ValidationError): ValidationErrorType => {
    const expressError = error as unknown as FieldValidationError;

    return {
        field: expressError.path,
        message: expressError.msg,
    };
};
export const inputValidationResultMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req).formatWith(formatErrors).array({ onlyFirstError: true });

    if (errors.length > 0) {
        res.status(HTTPStatus.BAD_REQUEST).json({ errorMessages: errors });
        return;
    }

    next();
};
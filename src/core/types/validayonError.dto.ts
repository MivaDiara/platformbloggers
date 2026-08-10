import {HTTPStatus} from "./HTTPStatus";

type ValidationErrorOutput  = {
    message: string;
    field: string;
};


export type ValidationErrorListOutput  = { errorsMessages: ValidationErrorOutput[] };
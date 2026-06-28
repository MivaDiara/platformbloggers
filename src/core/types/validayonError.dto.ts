import {HTTPStatus} from "./HTTPStatus";

type ValidationErrorOutput  = {
    status: HTTPStatus;
    detail: string;
    source:  { pointer: string };
    code: string | null;
};


export type ValidationErrorListOutput  = { errorMessages: ValidationErrorOutput[] };
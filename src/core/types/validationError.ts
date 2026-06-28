import {HTTPStatus} from "./HTTPStatus";


export type ValidationErrorType = {
    status: HTTPStatus;
    detail: string;
    source?: string;
    code?: string;
}
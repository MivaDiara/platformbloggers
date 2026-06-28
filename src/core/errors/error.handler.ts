import {Response} from "express";
import {RepositoryNotFoundError} from "./repository-not-found-error";
import {HTTPStatus} from "../types/HTTPStatus";
import {createErrorMessages} from "../validation/input-validation-result.middleware";
import {DomainError} from "./domain.error";

export function handleError(err: unknown, res: Response): void {
    if (err instanceof RepositoryNotFoundError){
        const httpstatus = HTTPStatus.NOT_FOUND;
        res.status(httpstatus).send(
            createErrorMessages(
                [
                    {
                        status: HTTPStatus.NOT_FOUND,
                        detail: err.message
                    },
                ]),
        );
        return;
    }

    if (err instanceof DomainError) {
        const httpStatus = HTTPStatus.UNPROCESSABLE_ENTITY;

        res.status(httpStatus).send(
            createErrorMessages([
                {
                    status: httpStatus,
                    source: err.source,
                    detail: err.message,
                    code: err.code,
                },
            ]),
        );

        return;
    }

    res.status(HTTPStatus.INTERNAL_SERVER_ERROR);
    return;
}
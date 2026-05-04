import {body} from "express-validator";

const nameValidation = body("name")
    .isString().withMessage("Должна быть строка")
    .trim()
    .isLength({min: 1, max: 15}).withMessage("Не правильная длина названия блога, минимум 1 символ, максимум 15");
const descriptionValidation = body("description")
    .isString().withMessage("Описание должно быть строкой")
    .trim()
    .isLength({min: 1, max: 500}).withMessage("Некорректная длина описания блога");
const websiteUrlValidation = body("websiteUrl")
    .trim()
    .isURL(
        {
            protocols: ['http', 'https'],
            require_protocol: true,
            require_valid_protocol: true,
            require_host: true,
            require_tld: true

        }
    ).withMessage("Website URL must be a valid URL starting with http:// or https://")


export const blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
]
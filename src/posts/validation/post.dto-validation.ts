import {body} from "express-validator";

const titleValidation = body("title")
    .isString().withMessage("Название поста должна быть строкой")
    .trim()
    .isLength({min: 1, max: 30}).withMessage("Не правильная длина названия поста, минимум 1 символ, максимум 15");
const shortDescriptionValidation = body("shortDescription")
    .isString().withMessage("Описание должно быть строкой")
    .trim()
    .isLength({min: 1, max: 100}).withMessage("Не правильная длина строки в описании");
const contentValidation = body("content")
    .isString().withMessage("Контент должен быть строкой")
    .trim()
    .isLength({min: 1, max: 1000}).withMessage("Не правильная длина строки контента");
const blogIdValidation = body("blogId")
    .isString()
    .withMessage('blogId must contain only digits');

export const postInputDtoValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
]

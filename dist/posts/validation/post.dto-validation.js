"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInputDtoValidation = void 0;
const express_validator_1 = require("express-validator");
const titleValidation = (0, express_validator_1.body)("title")
    .isString().withMessage("Название поста должна быть строкой")
    .trim()
    .isLength({ min: 1, max: 30 }).withMessage("Не правильная длина названия поста, минимум 1 символ, максимум 15");
const shortDescriptionValidation = (0, express_validator_1.body)("shortDescription")
    .isString().withMessage("Описание должно быть строкой")
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage("Не правильная длина строки в описании");
const contentValidation = (0, express_validator_1.body)("content")
    .isString().withMessage("Контент должен быть строкой")
    .trim()
    .isLength({ min: 1, max: 1000 }).withMessage("Не правильная длина строки контента");
const blogIdValidation = (0, express_validator_1.body)("blogId")
    .isString()
    .withMessage('blogId must contain only digits');
exports.postInputDtoValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
];

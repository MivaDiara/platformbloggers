"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInputDtoValidation = void 0;
const express_validator_1 = require("express-validator");
const nameValidation = (0, express_validator_1.body)("name")
    .isString().withMessage("Должна быть строка")
    .trim()
    .isLength({ min: 1, max: 15 }).withMessage("Не правильная длина названия блога, минимум 1 символ, максимум 15");
const descriptionValidation = (0, express_validator_1.body)("description")
    .isString().withMessage("Описание должно быть строкой")
    .trim()
    .isLength({ min: 1, max: 500 }).withMessage("Некорректная длина описания блога");
const websiteUrlValidation = (0, express_validator_1.body)("websiteUrl")
    .trim()
    .isURL({
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
    require_host: true,
    require_tld: true
}).withMessage("Website URL must be a valid URL starting with http:// or https://");
exports.blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
];

import {body} from "express-validator";

const emailValidator = body("email")
    .isEmail().withMessage("Email is required")
;
const passwordValidator = body("password")
    .isString().withMessage("Password is required")
    .trim()
    .isLength({ min: 6, max: 20 }).withMessage("Password must be at least 6 characters long and no more 20");
const loginValidator = body("login")
    .isString().withMessage("Login is required")
    .trim()
    .isLength({min: 3, max: 10}).withMessage("Login must be at least 3 characters long and no more 10")
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage("Unvailable characters in login");

export const userInputDtoValidation = [
    emailValidator,
    passwordValidator,
    loginValidator
]
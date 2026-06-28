import { query } from 'express-validator';
import {paginationAndSortingValidation} from "../../core/validation/query-pagination-sorting";
import {PostSortField} from "../input/post-sort-field";


export const postQueryValidation = [
    // Пагинация и сортировка
    ...paginationAndSortingValidation(PostSortField),

    // Дополнительные фильтры (поиск)
    query('searchPostTitleTerm')
        .optional()
        .isString()
        .withMessage('Search term must be a string')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Search term must not be empty'),
];
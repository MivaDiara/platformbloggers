import { query } from 'express-validator';
import {paginationAndSortingValidation} from "../../core/validation/query-pagination-sorting";
import {BlogSortField} from "../input/blog-sort-field";



export const blogQueryValidation = [
    // Пагинация и сортировка
    ...paginationAndSortingValidation(BlogSortField),

    // Дополнительные фильтры (поиск)
    query('searchBlogNameTerm')
        .optional()
        .isString()
        .withMessage('Search term must be a string')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Search term must not be empty'),
];
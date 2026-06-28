"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListsPostHandler = getListsPostHandler;
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const posts_service_1 = require("../../application/posts.service");
const express_validator_1 = require("express-validator");
const set_default_sort_and_pagination_1 = require("../../../core/helpers/set-default-sort-and-pagination");
const map_to_post_list_paginated_output_util_1 = require("../../mappers/map-to-post-list-paginated-output.util");
function getListsPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sanitizedQuery = (0, express_validator_1.matchedData)(req, {
                locations: ['query'],
                includeOptionals: true,
            });
            const queryInput = (0, set_default_sort_and_pagination_1.setDefaultSortAndPaginationIfNotExist)(sanitizedQuery);
            const { items, totalCount } = yield posts_service_1.postsService.findMany(queryInput);
            const postLostOutput = (0, map_to_post_list_paginated_output_util_1.mapToPostListPaginatedOutput)(items, {
                pageNumber: queryInput.pageNumber,
                pageSize: queryInput.pageSize,
                totalCount
            });
            res.status(HTTPStatus_1.HTTPStatus.OK).send(postLostOutput);
        }
        catch (error) {
            res.sendStatus(HTTPStatus_1.HTTPStatus.NOT_FOUND);
        }
    });
}

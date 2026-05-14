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
exports.createBlogHandler = createBlogHandler;
const blogs_repository_1 = require("../../repositories/blogs.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const maps_to_blogs_to_view_1 = require("../../mapping/maps-to-blogs-to-view");
function createBlogHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newBlog = {
                name: req.body.name,
                description: req.body.description,
                websiteUrl: req.body.websiteUrl
            };
            const createdBlog = yield blogs_repository_1.BlogsRepository.create(newBlog);
            const blogViewModel = (0, maps_to_blogs_to_view_1.mapToBlogViewModel)(createdBlog);
            res.status(HTTPStatus_1.HTTPStatus.CREATED).send(blogViewModel);
        }
        catch (error) {
            res.sendStatus(HTTPStatus_1.HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    });
}

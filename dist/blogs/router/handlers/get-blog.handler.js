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
exports.getBlogHandler = getBlogHandler;
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const blogs_service_1 = require("../../application/blogs.service");
const map_to_blog_output_util_1 = require("../mappers/map-to-blog-output.util");
function getBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const blog = yield blogs_service_1.blogsService.findOneOrFail(id);
            const blogViewModel = (0, map_to_blog_output_util_1.mapToBlogOutput)(blog);
            res.send(blogViewModel);
        }
        catch (err) {
            res.sendStatus(HTTPStatus_1.HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    });
}

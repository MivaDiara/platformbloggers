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
const blogs_repository_1 = require("../../repositories/blogs.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const input_validation_result_middleware_1 = require("../../../core/validation/input-validation-result.middleware");
const maps_to_blogs_to_view_1 = require("../../mapping/maps-to-blogs-to-view");
function getBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const blog = yield blogs_repository_1.BlogsRepository.findByID(id);
            if (!blog) {
                res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Такого блога нет").send((0, input_validation_result_middleware_1.createErrorMessages)([{ field: 'id', message: 'Vehicle not found' }]));
                return;
            }
            const blogViewModel = (0, maps_to_blogs_to_view_1.mapToBlogViewModel)(blog);
            res.send(blogViewModel);
        }
        catch (err) {
            res.sendStatus(HTTPStatus_1.HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    });
}

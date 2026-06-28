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
exports.BlogsRepository = void 0;
const db_1 = require("../../db/db");
const mongodb_1 = require("mongodb");
const repository_not_found_error_1 = require("../../core/errors/repository-not-found-error");
exports.BlogsRepository = {
    findAll(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection, searchBlogNameTerm } = queryDto;
            const skip = (pageNumber - 1) * pageSize;
            const filter = {};
            if (searchBlogNameTerm) {
                filter.$or = [];
                if (searchBlogNameTerm) {
                    filter.$or.push({ "name": { "$regex": `${searchBlogNameTerm}`, "$options": "i" } });
                }
            }
            const items = yield db_1.blogsCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield db_1.blogsCollection.countDocuments(filter);
            return { items, totalCount };
        });
    },
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    findByIdOrFail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!res) {
                throw new repository_not_found_error_1.RepositoryNotFoundError("Blog is not exist");
            }
            return res;
        });
    },
    create(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertBlog = yield db_1.blogsCollection.insertOne(newBlog);
            return insertBlog.insertedId.toString();
        });
    },
    update(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBlog = yield db_1.blogsCollection.updateOne({
                _id: new mongodb_1.ObjectId(id),
            }, {
                $set: {
                    name: dto.name,
                    description: dto.description,
                    websiteUrl: dto.websiteUrl
                }
            });
            if (updatedBlog.matchedCount < 1) {
                throw new Error('Blog not exist');
            }
            return;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedBlog = yield db_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedBlog.deletedCount < 1) {
                throw new Error('Blog not deleted');
            }
            return;
        });
    }
};

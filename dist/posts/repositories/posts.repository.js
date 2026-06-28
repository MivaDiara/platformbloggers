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
exports.postsRepository = void 0;
const db_1 = require("../../db/db");
const mongodb_1 = require("mongodb");
const repository_not_found_error_1 = require("../../core/errors/repository-not-found-error");
exports.postsRepository = {
    findAll(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection, searchPostTitleTerm } = queryDto;
            const skip = (pageNumber - 1) * pageSize;
            const filter = {};
            if (searchPostTitleTerm) {
                filter.$or = [];
                if (searchPostTitleTerm) {
                    filter.$or.push({ "title": { "$regex": `${searchPostTitleTerm}`, "$options": "i" } });
                }
            }
            const items = yield db_1.postCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield db_1.postCollection.countDocuments(filter);
            return { items, totalCount };
        });
    },
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    findByIdOrFail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.postCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!res) {
                throw new repository_not_found_error_1.RepositoryNotFoundError("Post doesnt exist");
            }
            return res;
        });
    },
    findAllInBlogs(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { blogId: blogId };
            return db_1.postCollection.find(filter).toArray();
        });
    },
    create(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield db_1.postCollection.insertOne(newPost);
            return insertResult.insertedId.toString();
        });
    },
    update(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPost = yield db_1.postCollection.updateOne({
                _id: new mongodb_1.ObjectId(id),
            }, {
                $set: {
                    title: dto.title,
                    content: dto.content,
                    shortDescription: dto.shortDescription,
                    blogId: dto.blogId
                }
            });
            if (updatedPost.matchedCount < 1) {
                throw new Error('No such post');
            }
            return;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield db_1.postCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedPost.deletedCount < 1) {
                throw new Error('No such post');
            }
            return;
        });
    }
};

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
require("reflect-metadata");
const post_1 = __importDefault(require("../models/post"));
let PostRepository = class PostRepository {
    constructor(model = post_1.default) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield new this.model(data).save();
            return result;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findById(id);
            return result;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.find();
            return result;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByIdAndUpdate(id, data, { new: true });
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByIdAndDelete(id);
            return result;
        });
    }
    findByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.find({ author: authorId });
            return result;
        });
    }
    searchByTitleOrContent(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(query, 'i'); // Case-insensitive regex
            const result = yield this.model.find({ $or: [{ title: regex }, { content: regex }] });
            return result;
        });
    }
    findPublishedPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.find({ publish: true });
            return result;
        });
    }
    updatePartial(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByIdAndUpdate(id, { $set: data }, { new: true });
            return result;
        });
    }
    addCategory(postId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByIdAndUpdate(postId, { $addToSet: { categories: categoryId } }, { new: true });
            return result;
        });
    }
    removeCategory(postId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findByIdAndUpdate(postId, { $pull: { categories: categoryId } }, { new: true });
            return result;
        });
    }
    getPostsByCategories(categories) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.find({ categories: { $in: categories } });
            return result;
        });
    }
    getPostsByNewsBreaking() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.find({ newsBreaking: true });
            return result;
        });
    }
    getPostsByEditorsPick() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.find({ editorsPick: true });
            return result;
        });
    }
    findMostRead() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find().sort({ reads: -1 }).exec();
        });
    }
    findMostInteracted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find().sort({ comments: -1 }).exec();
        });
    }
    findFeatured() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ featured: true });
        });
    }
    findArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ article: true });
        });
    }
    findPhotoSplash() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ photoSplash: true });
        });
    }
    findInFocus() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ inFocus: true });
        });
    }
    findFantasy() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ fantasy: true });
        });
    }
};
PostRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], PostRepository);
exports.default = PostRepository;

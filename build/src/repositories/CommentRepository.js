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
const mongoose_1 = __importDefault(require("mongoose"));
require("reflect-metadata");
const comment_1 = __importDefault(require("../models/comment"));
let CommentRepository = class CommentRepository {
    constructor(model = comment_1.default) {
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
            const objectId = new mongoose_1.default.Types.ObjectId(id);
            const result = yield this.model.findById(objectId).populate('author inResponse');
            return result;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.find().populate('author inResponse');
            return result;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.default.Types.ObjectId(id);
            const result = yield this.model.findByIdAndUpdate(objectId, data, { new: true });
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.default.Types.ObjectId(id);
            const result = yield this.model.findByIdAndDelete(objectId);
            return result;
        });
    }
    findByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorObjectId = new mongoose_1.default.Types.ObjectId(authorId);
            const result = yield this.model.find({ author: authorObjectId }).populate('inResponse');
            return result;
        });
    }
    findByPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postObjectId = new mongoose_1.default.Types.ObjectId(postId);
            const result = yield this.model.find({ inResponse: postObjectId }).populate('author');
            return result;
        });
    }
    updatePartial(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.default.Types.ObjectId(id);
            const result = yield this.model.findByIdAndUpdate(objectId, { $set: data }, { new: true });
            return result;
        });
    }
};
CommentRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], CommentRepository);
exports.default = CommentRepository;

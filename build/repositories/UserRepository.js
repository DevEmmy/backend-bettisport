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
const user_1 = __importDefault(require("../models/user"));
require("reflect-metadata");
let UserRepository = class UserRepository {
    constructor(model = user_1.default) {
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
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.findOne({ email });
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
    getLikedAndSavedPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findById(userId).populate("likes").populate("saved");
            let saved = user === null || user === void 0 ? void 0 : user.saved;
            let likes = user === null || user === void 0 ? void 0 : user.likes;
            return { saved, likes };
        });
    }
    findByRoles(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.model.find({ role });
            return users;
        });
    }
    findByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ resetToken: token });
            return user;
        });
    }
};
UserRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], UserRepository);
exports.default = UserRepository;

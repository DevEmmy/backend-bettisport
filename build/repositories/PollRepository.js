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
const mongoose_1 = __importDefault(require("mongoose"));
const poll_1 = __importDefault(require("../models/poll"));
let PollRepository = class PollRepository {
    constructor(model = poll_1.default) {
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
            const result = yield this.model.findById(objectId).populate('author choices.voters');
            return result;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.model.find().populate('author');
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
    vote(pollId, choiceIndex, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pollObjectId = new mongoose_1.default.Types.ObjectId(pollId);
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const poll = yield this.model.findById(pollObjectId);
            if (!poll)
                throw new Error("Poll not found");
            const choice = poll.choices[choiceIndex];
            if (!choice)
                throw new Error("Choice not found");
            if (choice.voters.some((voterId) => voterId.equals(userObjectId))) {
                throw new Error("User has already voted for this choice");
            }
            choice.votes += 1;
            choice.voters.push(userObjectId);
            yield poll.save();
            return poll;
        });
    }
    findByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorObjectId = new mongoose_1.default.Types.ObjectId(authorId);
            const result = yield this.model.find({ author: authorObjectId });
            return result;
        });
    }
    findByQuestion(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(query, 'i'); // Case-insensitive regex
            const result = yield this.model.find({ question: regex });
            return result;
        });
    }
};
PollRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], PollRepository);
exports.default = PollRepository;

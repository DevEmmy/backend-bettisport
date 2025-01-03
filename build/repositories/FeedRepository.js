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
exports.FeedRepository = void 0;
// repositories/FeedRepository.ts
const typedi_1 = require("typedi");
const feed_1 = __importDefault(require("../models/feed"));
let FeedRepository = class FeedRepository {
    constructor(model = feed_1.default) {
        this.model = model;
    }
    create(feed) {
        return __awaiter(this, void 0, void 0, function* () {
            const newFeed = new this.model(feed);
            return yield newFeed.save();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findById(id).populate('postedBy').populate('likes').exec();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find().populate('postedBy').populate('likes').exec();
        });
    }
    updateById(id, feed) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndUpdate(id, feed, { new: true }).exec();
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndDelete(id).exec();
        });
    }
};
FeedRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], FeedRepository);
exports.FeedRepository = FeedRepository;

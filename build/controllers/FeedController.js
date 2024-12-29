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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedController = void 0;
const typedi_1 = require("typedi");
const FeedServices_1 = require("../services/FeedServices");
let FeedController = class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feed = req.body;
                feed.postedBy = req.body.user;
                const newFeed = yield this.feedService.create(feed);
                res.status(201).json(newFeed);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feed = yield this.feedService.findById(req.params.id);
                if (!feed) {
                    res.status(404).json({ error: "Feed not found" });
                }
                else {
                    res.status(200).json(feed);
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feeds = yield this.feedService.findAll();
                res.status(200).json(feeds);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feed = yield this.feedService.updateById(req.params.id, req.body);
                if (!feed) {
                    res.status(404).json({ error: "Feed not found" });
                }
                else {
                    res.status(200).json(feed);
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feed = yield this.feedService.deleteById(req.params.id);
                if (!feed) {
                    res.status(404).json({ error: "Feed not found" });
                }
                else {
                    res.status(204).json();
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
};
FeedController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [FeedServices_1.FeedService])
], FeedController);
exports.FeedController = FeedController;

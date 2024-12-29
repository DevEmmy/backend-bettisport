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
exports.PollController = void 0;
const typedi_1 = require("typedi");
require("reflect-metadata");
const PollServices_1 = require("../services/PollServices");
const response_1 = require("../utils/response");
let PollController = class PollController {
    constructor(service) {
        this.service = service;
    }
    createPoll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                body.author = req.body.user;
                const poll = yield this.service.createPoll(body);
                return (0, response_1.success)(poll, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    getPollById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const poll = yield this.service.getPollById(id);
                if (!poll) {
                    return (0, response_1.error)("Poll not found", res, 404);
                }
                return (0, response_1.success)(poll, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    getAllPolls(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const polls = yield this.service.getAllPolls();
                return (0, response_1.success)(polls, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    updatePoll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const poll = yield this.service.updatePoll(id, body);
                if (!poll) {
                    return (0, response_1.error)("Poll not found", res, 404);
                }
                return (0, response_1.success)(poll, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    deletePoll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.service.deletePoll(id);
                if (!result) {
                    return (0, response_1.error)("Poll not found", res, 404);
                }
                return (0, response_1.success)({ message: "Poll deleted successfully" }, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    voteOnPoll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const poll = yield this.service.voteOnPoll(body);
                return (0, response_1.success)(poll, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPollsByAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorId } = req.params;
                const polls = yield this.service.findPollsByAuthor(authorId);
                return (0, response_1.success)(polls, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findPollsByQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.params;
                const polls = yield this.service.findPollsByQuestion(query);
                return (0, response_1.success)(polls, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
};
PollController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [PollServices_1.PollService])
], PollController);
exports.PollController = PollController;

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
exports.PollService = void 0;
const typedi_1 = require("typedi");
const PollRepository_1 = __importDefault(require("../repositories/PollRepository"));
require("reflect-metadata");
let PollService = exports.PollService = class PollService {
    constructor(repo) {
        this.repo = repo;
    }
    createPoll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const poll = yield this.repo.create(data);
                return poll;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    getPollById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const poll = yield this.repo.findById(id);
                if (!poll) {
                    return { message: "Poll not found" };
                }
                return poll;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    getAllPolls() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const polls = yield this.repo.findAll();
                return polls;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    updatePoll(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const poll = yield this.repo.update(id, data);
                if (!poll) {
                    return { message: "Poll not found" };
                }
                return poll;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    deletePoll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repo.delete(id);
                if (!result) {
                    return { message: "Poll not found" };
                }
                return { message: "Poll deleted successfully" };
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    voteOnPoll(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { pollId, choiceIndex, userId } = data;
                const poll = yield this.repo.vote(pollId, choiceIndex, userId);
                return poll;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPollsByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const polls = yield this.repo.findByAuthor(authorId);
                return polls;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    findPollsByQuestion(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const polls = yield this.repo.findByQuestion(query);
                return polls;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
};
exports.PollService = PollService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [PollRepository_1.default])
], PollService);

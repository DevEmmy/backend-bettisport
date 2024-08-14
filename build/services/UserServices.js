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
exports.UserServices = void 0;
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const bcrypt_1 = __importDefault(require("bcrypt"));
require("reflect-metadata");
const typedi_1 = require("typedi");
const mongoose_1 = __importDefault(require("mongoose"));
const EmailServices_1 = __importDefault(require("./EmailServices"));
let jwtSecret = process.env.JWT_SECRET;
let UserServices = exports.UserServices = class UserServices {
    constructor(repo, emailService) {
        this.repo = repo;
        this.emailService = emailService;
    }
    ;
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password } = user;
            let checkUser = yield this.repo.findByEmail(email);
            if (checkUser) {
                return { message: "User with this email already exists.", payload: null };
            }
            user.password = yield bcrypt_1.default.hash(password, 8);
            user = yield this.repo.create(user);
            yield this.emailService.getLoginCredentials(email, password);
            return { payload: user, message: "User Created" };
        });
    }
    generateToken(id) {
        let token = jsonwebtoken_1.default.sign({ id }, jwtSecret);
        return token;
    }
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = data;
                let checkUser = yield this.repo.findByEmail(email);
                if (checkUser) {
                    return { message: "User with this email already exists." };
                }
                data.password = yield bcrypt_1.default.hash(password, 8);
                let user = yield this.repo.create(data);
                let token = this.generateToken(String(user._id));
                return {
                    payload: { user, token }
                };
            }
            catch (err) {
                throw Error(err.message);
            }
        });
    }
    signIn(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = data;
                let user = yield this.repo.findByEmail(email);
                if (!user) {
                    return { message: "User with this email does not exist" };
                }
                let doMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!doMatch) {
                    return { message: "Incorrect Password" };
                }
                let token = this.generateToken(String(user._id));
                return {
                    payload: { user, token }
                };
            }
            catch (err) {
                throw Error(err.message);
            }
        });
    }
    likePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.repo.findById(userId);
                user === null || user === void 0 ? void 0 : user.likes.push(new mongoose_1.default.Types.ObjectId(postId));
                user = yield this.repo.update(userId, user);
                return {
                    payload: user,
                    message: "Post Saved"
                };
            }
            catch (err) {
                throw Error(err.message);
            }
        });
    }
    savePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.repo.findById(userId);
                user === null || user === void 0 ? void 0 : user.saved.push(new mongoose_1.default.Types.ObjectId(postId));
                user = yield this.repo.update(userId, user);
                return {
                    payload: user,
                    message: "Post Saved"
                };
            }
            catch (err) {
                throw Error(err.message);
            }
        });
    }
    getLikedAndSaved(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = yield this.repo.getLikedAndSavedPosts(userId);
                return { payload };
            }
            catch (err) {
                throw Error(err.message);
            }
        });
    }
    getUsersByRoles(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = yield this.repo.findByRoles(role);
                return { payload };
            }
            catch (err) {
                throw Error(err.message);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = yield this.repo.findAll();
                return { payload };
            }
            catch (err) {
                throw Error(err.message);
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = yield this.repo.findById(id);
                return { payload };
            }
            catch (err) {
                throw Error(err.message);
            }
        });
    }
};
exports.UserServices = UserServices = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [UserRepository_1.default, EmailServices_1.default])
], UserServices);

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
exports.NotificationService = void 0;
const typedi_1 = require("typedi");
const NotificationRepository_1 = require("../repositories/NotificationRepository");
let NotificationService = class NotificationService {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    createNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notificationRepository.createNotification(data);
        });
    }
    getNotificationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notificationRepository.findNotificationById(id);
        });
    }
    getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notificationRepository.findNotificationsByUser(userId);
        });
    }
    markNotificationAsRead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notificationRepository.markAsRead(id);
        });
    }
    deleteNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notificationRepository.deleteNotification(id);
        });
    }
    // New methods for post liked and saved notifications
    notifyPostLiked(postOwnerId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationData = {
                user: postOwnerId,
                title: 'Your post was liked!',
                message: `${user} liked your post.`,
                read: false,
            };
            console.log("Notification sent");
            return yield this.createNotification(notificationData);
        });
    }
    notifyPostSaved(postOwnerId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationData = {
                user: postOwnerId,
                title: 'Your post was saved!',
                message: `${user} saved your post.`,
                read: false,
            };
            return yield this.createNotification(notificationData);
        });
    }
};
NotificationService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [NotificationRepository_1.NotificationRepository])
], NotificationService);
exports.NotificationService = NotificationService;

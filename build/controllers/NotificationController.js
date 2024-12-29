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
exports.NotificationController = void 0;
const typedi_1 = require("typedi");
const NotificationServices_1 = require("../services/NotificationServices");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    createNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield this.notificationService.createNotification(req.body);
                return res.status(201).json(notification);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to create notification', error });
            }
        });
    }
    getNotificationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield this.notificationService.getNotificationById(req.params.id);
                if (!notification)
                    return res.status(404).json({ message: 'Notification not found' });
                return res.status(200).json(notification);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to retrieve notification', error });
            }
        });
    }
    getUserNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.body.user;
                console.log(userId);
                const notifications = yield this.notificationService.getUserNotifications(userId);
                return res.status(200).json(notifications);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to retrieve notifications', error });
            }
        });
    }
    markNotificationAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield this.notificationService.markNotificationAsRead(req.params.id);
                if (!notification)
                    return res.status(404).json({ message: 'Notification not found' });
                return res.status(200).json(notification);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to mark notification as read', error });
            }
        });
    }
    deleteNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield this.notificationService.deleteNotification(req.params.id);
                if (!notification)
                    return res.status(404).json({ message: 'Notification not found' });
                return res.status(200).json({ message: 'Notification deleted' });
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to delete notification', error });
            }
        });
    }
};
NotificationController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [NotificationServices_1.NotificationService])
], NotificationController);
exports.NotificationController = NotificationController;

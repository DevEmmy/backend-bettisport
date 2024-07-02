"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const NewsletterController_1 = __importDefault(require("../controllers/NewsletterController"));
const router = (0, express_1.Router)();
const controller = typedi_1.default.get(NewsletterController_1.default);
router.post("/subscribe", (req, res) => controller.subscribe(req, res));
router.get("/subscribers", (req, res) => controller.getAllSubscribers(req, res));
router.post("/unsubscribe", (req, res) => controller.unsubscribe(req, res));
exports.default = router;

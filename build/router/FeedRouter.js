"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/FeedRouter.ts
const express_1 = require("express");
const typedi_1 = require("typedi");
const FeedController_1 = require("../controllers/FeedController");
const verifyAuth_1 = require("../middleware/verifyAuth");
const router = (0, express_1.Router)();
const feedController = typedi_1.Container.get(FeedController_1.FeedController);
router.post("/", verifyAuth_1.verifyAuth, (req, res) => feedController.create(req, res));
router.get("/:id", verifyAuth_1.verifyAuth, (req, res) => feedController.getById(req, res));
router.get("/", verifyAuth_1.verifyAuth, (req, res) => feedController.getAll(req, res));
router.put("/:id", verifyAuth_1.verifyAuth, (req, res) => feedController.updateById(req, res));
router.delete("/:id", verifyAuth_1.verifyAuth, (req, res) => feedController.deleteById(req, res));
exports.default = router;

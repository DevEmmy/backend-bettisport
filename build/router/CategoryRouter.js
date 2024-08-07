"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const CategoryController_1 = require("../controllers/CategoryController");
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = require("../middleware/verifyAuth");
const categoryRouter = (0, express_1.default)();
const categoryController = typedi_1.default.get(CategoryController_1.CategoryController);
categoryRouter.post("/", verifyAuth_1.verifyAuth, (req, res) => categoryController.createCategory(req, res));
categoryRouter.post("/add-multiple", (req, res) => categoryController.addMultiple(req, res));
categoryRouter.get("/:id", (req, res) => categoryController.getCategoryById(req, res));
categoryRouter.get("/", (req, res) => categoryController.getAllCategories(req, res));
categoryRouter.put("/:id", (req, res) => categoryController.updateCategory(req, res));
categoryRouter.delete("/:id", (req, res) => categoryController.deleteCategory(req, res));
categoryRouter.get("/slug/:slug", (req, res) => categoryController.findCategoryBySlug(req, res));
categoryRouter.get("/parent/:parentCategory", (req, res) => categoryController.findCategoriesByParentCategory(req, res));
categoryRouter.patch("/:id", (req, res) => categoryController.updatePartialCategory(req, res));
exports.default = categoryRouter;

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
exports.CategoryController = void 0;
const typedi_1 = require("typedi");
require("reflect-metadata");
const CategoryServices_1 = require("../services/CategoryServices");
const response_1 = require("../utils/response");
let CategoryController = exports.CategoryController = class CategoryController {
    constructor(service) {
        this.service = service;
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const category = yield this.service.createCategory(body);
                return (0, response_1.success)(category, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    addMultiple(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categories } = req.body;
                for (let i = 0; i < categories.length - 1; i++) {
                    const category = yield this.service.createCategory(categories[i]);
                }
                return (0, response_1.success)(null, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const category = yield this.service.getCategoryById(id);
                if (!category) {
                    return (0, response_1.error)("Category not found", res, 404);
                }
                return (0, response_1.success)(category, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.service.getAllCategories();
                return (0, response_1.success)(categories, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const category = yield this.service.updateCategory(id, body);
                if (!category) {
                    return (0, response_1.error)("Category not found", res, 404);
                }
                return (0, response_1.success)(category, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.service.deleteCategory(id);
                if (!result) {
                    return (0, response_1.error)("Category not found", res, 404);
                }
                return (0, response_1.success)({ message: "Category deleted successfully" }, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findCategoryBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const category = yield this.service.findCategoryBySlug(slug);
                if (!category) {
                    return (0, response_1.error)("Category not found", res, 404);
                }
                return (0, response_1.success)(category, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    findCategoriesByParentCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { parentCategory } = req.params;
                const categories = yield this.service.findCategoriesByParentCategory(parentCategory);
                return (0, response_1.success)(categories, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
    updatePartialCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const category = yield this.service.updatePartialCategory(id, body);
                if (!category) {
                    return (0, response_1.error)("Category not found", res, 404);
                }
                return (0, response_1.success)(category, res);
            }
            catch (err) {
                (0, response_1.error)(err.message, res, err.status || 400);
            }
        });
    }
};
exports.CategoryController = CategoryController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [CategoryServices_1.CategoryService])
], CategoryController);

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var PublishType;
(function (PublishType) {
    PublishType["DRAFT"] = "DRAFT";
    PublishType["PUBLISH"] = "PUBLISH";
})(PublishType || (PublishType = {}));
const schema = new mongoose_1.Schema({
    title: { type: String, require: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    content: String,
    media: String,
    publish: { type: Boolean, default: false },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Category" }],
    menCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Category" }],
    womenCategories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Category" }],
    excerpt: String,
    format: String,
    tags: [{ type: String }],
    featuredImage: { type: String },
    nationality: { type: String },
    highlight: { type: String },
    photoSplash: { type: String },
    slug: String,
    fantasy: { type: Boolean, default: false },
    editorsPick: { type: Boolean, default: false },
    newsBreaking: { type: Boolean, default: false },
    comments: { type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" },
    reads: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    article: { type: Boolean, default: false }
});
const Post = mongoose_1.default.model("Post", schema);
exports.default = Post;

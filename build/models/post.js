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
exports.PostFormat = exports.PublishType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var PublishType;
(function (PublishType) {
    PublishType["DRAFT"] = "DRAFT";
    PublishType["PUBLISH"] = "PUBLISH";
})(PublishType = exports.PublishType || (exports.PublishType = {}));
var PostFormat;
(function (PostFormat) {
    PostFormat["STORY"] = "STORY";
    PostFormat["PODCAST"] = "PODCAST";
    PostFormat["PHOTOSPLASH"] = "PHOTOSPLASH";
    PostFormat["VIDEO"] = "VIDEO";
    PostFormat["STANDARD"] = "STANDARD";
})(PostFormat = exports.PostFormat || (exports.PostFormat = {}));
const schema = new mongoose_1.Schema({
    title: { type: String, require: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    content: String,
    media: String,
    publish: { type: Boolean, default: false },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Category" }],
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    menCategories: [{ type: String }],
    womenCategories: [{ type: String }],
    excerpt: String,
    format: { type: String, enum: Object.values(PostFormat), default: PostFormat.STANDARD },
    tags: [{ type: String }],
    featuredImage: { type: String },
    nationality: { type: String },
    highlight: { type: String },
    photoSplash: { type: Boolean, default: false },
    slug: String,
    fantasy: { type: Boolean, default: false },
    editorsPick: { type: Boolean, default: false },
    newsBreaking: { type: Boolean, default: false },
    comments: { type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" },
    reads: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    article: { type: Boolean, default: false },
    inFocus: { type: Boolean, default: false },
    thumbNail: { type: String }
}, {
    timestamps: true
});
const Post = mongoose_1.default.model("Post", schema);
exports.default = Post;

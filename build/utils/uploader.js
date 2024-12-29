"use strict";
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
exports.uploaderListOfMedia = exports.uploader = void 0;
const cloudinary_1 = require("cloudinary");
require("dotenv").config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const uploader = (data, resourceType = "image") => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.v2.uploader.upload(data, { resource_type: resourceType });
    return result.secure_url;
});
exports.uploader = uploader;
const uploaderListOfMedia = (arr, resourceType = "image") => __awaiter(void 0, void 0, void 0, function* () {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(yield (0, exports.uploader)(arr[i].base64, resourceType));
    }
    return newArr;
});
exports.uploaderListOfMedia = uploaderListOfMedia;
exports.default = cloudinary_1.v2;

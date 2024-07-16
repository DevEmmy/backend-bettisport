"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    content: { type: String, require: true },
    postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    image: { type: String }
}, {
    timestamps: true
});
const Feed = (0, mongoose_1.model)("Feed", schema);
exports.default = Feed;

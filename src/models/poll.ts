import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define a sub-schema for choices to store votes and users who voted
const choiceSchema = new Schema({
    choiceId: { type: String, default: uuidv4 },
    choiceText: String,
    votes: { type: Number, default: 0 },
    voters: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const pollSchema = new Schema({
    question: { type: String, required: true },
    format: { type: String, required: true },
    choices: [choiceSchema],
    duration: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;

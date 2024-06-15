import mongoose, { Schema } from "mongoose";

// Define a sub-schema for choices to store votes and users who voted
const choiceSchema = new Schema({
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

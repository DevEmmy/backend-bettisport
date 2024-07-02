import mongoose, { Schema, Document } from "mongoose";

export interface INewsletter extends Document {
    email: string;
    createdAt: Date;
}

const NewsletterSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

const Newsletter = mongoose.model<INewsletter>("Newsletter", NewsletterSchema);

export default Newsletter;

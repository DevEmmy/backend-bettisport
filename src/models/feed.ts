import mongoose, {Schema, model} from "mongoose"

export interface IFeed extends mongoose.Document {
    content: string;
    postedBy: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema({
    content: {type: String, require: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "User"},
    likes: [{type: Schema.Types.ObjectId, ref: "User"}],
    image: {type: String}
},
{
    timestamps: true
})

const Feed = model<IFeed>("Feed", schema);
export default Feed;
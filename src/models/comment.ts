import mongoose, {Schema} from "mongoose";

const schema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    comment: String,
    inResponse: {type: Schema.Types.ObjectId, ref: "Post"},
},
{
    timestamps: true
})

const Comment = mongoose.model("Comment", schema);
export default Comment
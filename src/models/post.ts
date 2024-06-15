import mongoose, {Schema} from "mongoose";

enum PublishType {
    DRAFT = "DRAFT",
    PUBLISH = "PUBLISH"
}

const schema = new Schema({
    title: String,
    author:{type: Schema.Types.ObjectId, ref: "User"},
    content: String,
    media : String,
    publish: {type: Boolean, default: false},
    categories: [{type: Schema.Types.ObjectId, ref: "Category"}],
    menCategories: [{type: String}],
    womenCategories: [{type: String}],
    excerpt: String,
    format: String,
    tags: [{type: String}],
    featuredImage: {type: String},
    nationality: {type: String},
    highlight: {type: String},
    photoSplash: {type: String},
    slug: String,

})

const Post = mongoose.model("Post", schema);
export default Post
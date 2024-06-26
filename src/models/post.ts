import mongoose, {Schema} from "mongoose";

enum PublishType {
    DRAFT = "DRAFT",
    PUBLISH = "PUBLISH"
}

const schema = new Schema({
    title: {type:String, require: true},
    author:{type: Schema.Types.ObjectId, ref: "User"},
    content: String,
    media : String,
    publish: {type: Boolean, default: false},
    categories: [{type: Schema.Types.ObjectId, ref: "Category"}],
    menCategories: [{type: Schema.Types.ObjectId, ref: "Category"}],
    womenCategories: [{type: Schema.Types.ObjectId, ref: "Category"}],
    excerpt: String,
    format: String,
    tags: [{type: String}],
    featuredImage: {type: String},
    nationality: {type: String},
    highlight: {type: String},
    photoSplash: {type: String},
    slug: String,
    fantasy: {type: Boolean, default: false},
    editorsPick: {type: Boolean, default: false},
    newsBreaking: {type: Boolean, default: false},
    comments: {type: Schema.Types.ObjectId, ref: "Comment"},
    reads: {type: Number, default: 0},
    featured: {type: Boolean, default: false}
})

const Post = mongoose.model("Post", schema);
export default Post
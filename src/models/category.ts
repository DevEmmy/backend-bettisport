import mongoose, {Schema} from "mongoose";


const schema = new Schema({
    title: String,
    description: String,
    slug: String,
    parentCategory: String
})

const Category = mongoose.model("Category", schema);
export default Category
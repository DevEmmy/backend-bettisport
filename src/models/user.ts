import mongoose, {Schema} from "mongoose";
import { Roles } from "../enums/role-enums";

const schema = new Schema({
    firstName : {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePicture: {type: String, required: false, default: "https://i.pinimg.com/originals/cf/7b/65/cf7b6579b699862233526da318a4d3fa.jpg"},
    likes: [{type: Schema.Types.ObjectId, ref: "Post"}],
    saved: [{type: Schema.Types.ObjectId, ref: "Post"}],
    role: {type: String, enum: Object.values(Roles), default: Roles.SUBSCRIBER},
    resetToken: String,
    resetTokenExpiration: Date
},
{
    timestamps: true
})

const User = mongoose.model('User', schema);
export default User;
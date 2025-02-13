
import { model, Schema } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    }
});

export const User = model("User", userSchema);
import { model, Schema } from "mongoose";


const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: { type: String, required: true },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    }
});

export const Task = model("Task", taskSchema);
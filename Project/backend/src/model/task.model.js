import { Schema, model } from "mongoose";
// post schema
const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
            unqiue: [true, "Title already exists"]
        },
        discription: {
            type: String,
            trim: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            enum: ["done", "not_done"],
            default: "done"
        }
    },
    { timestamps: true }
);

export default model("Task", taskSchema);
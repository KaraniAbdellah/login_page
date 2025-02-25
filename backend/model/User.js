import mongoose, { mongo } from "mongoose";

const mySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = new mongoose.model("UserLogin", mySchema);

export default User;

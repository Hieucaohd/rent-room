import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        numberPhone: {
            type: String,
        },
        province: {
            type: Number,
        },
        district: {
            type: Number,
        },
        ward: {
            type: Number,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User = model("users", UserSchema);
export default User;

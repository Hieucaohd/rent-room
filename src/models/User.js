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
        defaultHome: {
            type: Schema.Types.ObjectId,
            ref: "homes",
            autopopulate: true,
        },
    },
    {
        timestamps: true,
    }
);

// plugin for autopopulate
UserSchema.plugin(require("mongoose-autopopulate"));

const User = model("users", UserSchema);
export default User;

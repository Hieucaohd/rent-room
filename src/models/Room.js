import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const RoomSchema = new Schema(
    {
        home: {
            type: Schema.Types.ObjectId,
            ref: "homes",
            autopopulate: true,
        },
        price: {
            type: Number,
        },
        square: {
            type: Number,
        },
        isRented: {
            type: Boolean,
            default: false,
        },
        floor: {
            type: Number,
        },
        images: {
            type: [String],
        },
        description: {
            type: String,
        },
        roomNumber: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// plugin for autopopulate
RoomSchema.plugin(require("mongoose-autopopulate"));

// plugin for pagination
RoomSchema.plugin(mongoosePaginate);

const Room = model("rooms", RoomSchema);
export default Room;

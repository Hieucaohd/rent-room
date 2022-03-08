import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const RoomSchema = new Schema(
    {
        home: {
            type: Schema.Types.ObjectId,
            ref: "homes",
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
        }
    },
    {
        timestamps: true,
    }
);

RoomSchema.plugin(mongoosePaginate);

const Room = model("rooms", RoomSchema);
export default Room;

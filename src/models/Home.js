import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const HomeSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "users",
            autopopulate: true,
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
        liveWithOwner: {
            type: Boolean,
        },
        electricityPrice: {
            type: Number,
        },
        waterPrice: {
            type: Number,
        },
        images: {
            type: [String],
        },
        totalRooms: {
            type: Number,
        },
        position: {
            x: {
                type: String,
            },
            y: {
                type: String,
            },
            lng: {
                type: String,
            },
            lat: {
                type: String,
            }
        },
    },
    {
        timestamps: true,
    }
);

// plugin for autopopulate
HomeSchema.plugin(require("mongoose-autopopulate"));

// plugin for pagination
HomeSchema.plugin(mongoosePaginate);

const Home = model("homes", HomeSchema);
export default Home;

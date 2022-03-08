import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const HomeSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "users",
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
    },
    {
        timestamps: true,
    }
);

HomeSchema.plugin(mongoosePaginate);

const Home = model("homes", HomeSchema);
export default Home;

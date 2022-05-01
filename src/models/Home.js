import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const HomeSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'users',
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
        internetPrice: {
            type: Number,
        },
        cleaningPrice: {
            type: Number,
        },
        images: {
            type: [String],
        },
        totalRooms: {
            type: Number,
        },
        detailAddress: {
            type: String,
        },
        position: {
            x: {
                type: Number,
            },
            y: {
                type: Number,
            },
            lng: {
                type: Number,
            },
            lat: {
                type: Number,
            },
        },
        description: {
            type: String,
        },
        title: {
            type: String,
        },
        minPrice: {
            type: Number,
        },
        maxPrice: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// plugin for autopopulate
HomeSchema.plugin(require('mongoose-autopopulate'));

// plugin for pagination
HomeSchema.plugin(mongoosePaginate);

const Home = model('homes', HomeSchema);
export default Home;

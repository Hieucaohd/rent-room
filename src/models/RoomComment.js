import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const RoomCommentSchema = new Schema(
    {
        room: {
            type: Schema.Types.ObjectId,
            refs: 'rooms',
            autopopulate: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            autopopulate: true,
        },
        content: {
            type: String,
        },
        images: {
            type: [String],
        },
        ratingStar: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);

RoomCommentSchema.plugin(require('mongoose-autopopulate'));
RoomCommentSchema.plugin(mongoosePaginate);

const RoomComment = model('room-comments', RoomCommentSchema);
export default RoomComment;
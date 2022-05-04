import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const HomeCommentSchema = new Schema(
    {
        home: {
            type: Schema.Types.ObjectId,
            refs: 'homes',
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
        rateStar: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);

HomeCommentSchema.plugin(require('mongoose-autopopulate'));
HomeCommentSchema.plugin(mongoosePaginate);

const HomeComment = model('home-comments', HomeCommentSchema);
export default HomeComment;

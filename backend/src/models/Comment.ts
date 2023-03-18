import mongoose from "mongoose";
import IComment from "../interfaces/IComment";


const Schema = mongoose.Schema

const CommentSchema = new Schema<IComment>({
    news_id: {
        type: Schema.Types.ObjectId,
        ref: 'News',
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    comment: {
        type: String,
        required: true
    }
})

export const Comment = mongoose.model<IComment>('Comment', CommentSchema)
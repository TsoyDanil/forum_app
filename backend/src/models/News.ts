import mongoose from "mongoose";
import INews from "../interfaces/INews";


const Schema = mongoose.Schema

const NewsSchema = new Schema<INews>({
    header:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

export const News = mongoose.model<INews>('News', NewsSchema)
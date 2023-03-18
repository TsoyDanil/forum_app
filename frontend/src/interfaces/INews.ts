import { Types } from "mongoose";

export default interface INews {
    _id: Types.ObjectId
    header: string
    content: string
    image?:string
    timestamp: Date
}
import { Types } from "mongoose";
import INews from "./INews";

export default interface IComment {
    _id: Types.ObjectId
    news_id: INews['_id']
    author: string
    comment: string
}
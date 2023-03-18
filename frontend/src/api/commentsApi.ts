import { Types } from "mongoose";
import { EStatuses } from "../enum/EStatuses";
import IComment from "../interfaces/IComment";
import ICommentDto from "../interfaces/ICommentDto";
import IResponse from "../interfaces/IResponse";
import { commentsInstance } from "./instances";


class CommentsApi {
    public getComments = async(): Promise<IResponse<IComment[] | null>> => {
        try{
            const response = await commentsInstance.get('/')
            return response.data
        } catch( err: unknown){
            console.log(err);
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public getCommentsByNewsId = async(newsId: Types.ObjectId): Promise<IResponse<IComment[] | null>> => {
        try{
            const response = await commentsInstance.get(`?news_id=${newsId}`)
            return response.data
        } catch( err: unknown){
            console.log(err);
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public deleteCommentById = async(id: Types.ObjectId): Promise<IResponse<IComment | null>> => {
        try{
            const response = await commentsInstance.delete(`/${id}`)
            return response.data
        } catch( err: unknown){
            console.log(err);
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public addComment = async(commentDto: ICommentDto): Promise<IResponse<IComment | null>> => {
        try{
            const response = await commentsInstance.post('/', commentDto)
            return response.data
        } catch(err: unknown){
            console.log(err);
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }
}

export const commentsApi = new CommentsApi()
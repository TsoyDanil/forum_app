import { Request } from "express";
import IComment from "../interfaces/IComment";
import ICommentDto from "../interfaces/ICommentDto";
import IResponse from "../interfaces/IResponse";
import { mongooseDB } from "../repository/mongooseDB";


export class CommentsService {

    public getComments = async (req: Request): Promise<IResponse<IComment[] | IComment | null>> => {
        return await mongooseDB.getComments(req)
    }

    public addComment = async(commentDto: ICommentDto): Promise<IResponse<IComment | null>> => {
        return await mongooseDB.addComment(commentDto)
    }

    public deleteCommentById = async (id: string): Promise<IResponse<IComment | null>> => {
        return await mongooseDB.deleteCommentById(id)
    }
}

export const commentsService = new CommentsService()
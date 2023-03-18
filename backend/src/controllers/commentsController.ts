import express, { Request, Response, Router } from "express";
import { EStatuses } from "../enum/EStatuses";
import ICommentDto from "../interfaces/ICommentDto";
import { commentsService, CommentsService } from "../services/commentsService"


export class CommentsController {
    private router: Router
    private service: CommentsService
    constructor() {
        this.router = express.Router()
        this.service = commentsService
        this.router.get('/', this.getComments)
        this.router.post('/', this.addComment)
        this.router.delete('/:id', this.deleteCommentById)
    }

    public getRouter () {
        return this.router;
    }

    private getComments = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getComments(req)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private addComment = async (req: Request, res: Response): Promise<void> => {
        const commentDto: ICommentDto = req.body
        commentDto.author = commentDto.author?.trim() !== '' ?  commentDto.author : 'Anonymous'
        const response = await this.service.addComment(commentDto)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private deleteCommentById = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.deleteCommentById(req.params.id)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }
}
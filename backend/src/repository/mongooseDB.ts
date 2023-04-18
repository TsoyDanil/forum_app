import dotenv from 'dotenv';
import { Request } from 'express';
import mongoose, { Mongoose } from 'mongoose';
import { EStatuses } from '../enum/EStatuses';
import IComment from '../interfaces/IComment';
import ICommentDto from '../interfaces/ICommentDto';
import INews from '../interfaces/INews';
import INewsDto from '../interfaces/INewsDto';
import IResponse from '../interfaces/IResponse';
import { Comment } from '../models/Comment';
import { News } from '../models/News';
import { config } from '../index.config';

dotenv.config()

export class MongooseDB {
    
    private client: Mongoose | null = null

    public close = async () => {
        if (!this.client) return 
        await this.client.disconnect()
    }

    public init = async (): Promise<void> => {
        try {
            this.client = await mongoose.connect(config.mongoUrl)
            console.log('Server connected to MongoDB');
        } catch (err) {
            const error = err as Error;
            console.error('Connected error MongooseDB:', error);
        }
    }

    public getNews = async(req: Request): Promise<IResponse<INews[] | INews | null>> => {
        try{
            let data
            if (req.params.id){
                data = await News.findById(req.params.id)
            } else{
                data = await News.find().select('-content')
            }
            if (!data) throw new Error('No news found')
            const response: IResponse<INews[] | INews> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Found news'
            }
            return response
        } catch (err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public addNews = async (newsDto: INewsDto): Promise<IResponse<INews | null>> => {
        try{
            if (newsDto.header.trim() === '' || newsDto.content.trim() === '') throw new Error('Required fields are empty')
            const news = new News(newsDto)
            const data = await news.save()
            const response: IResponse<INews> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'New created successfully'
            }
            return response
        } catch (err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public deleteNewsById = async(id: string): Promise<IResponse<INews | null>> => {
        try{
            const data = await News.findOneAndDelete({_id: id})
            await Comment.deleteMany({news_id: id})
            if (!data) throw new Error('No news found')
            const response: IResponse<INews> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Deleted successfully'
            }
            return response
        } catch (err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public getComments = async(req: Request): Promise<IResponse<IComment[] | IComment | null>> => {
        try{
            let data
            if (req.query.news_id){
                data = await Comment.find({news_id: req.query.news_id})
            } else{
                data = await Comment.find()
            }
            if (!data) throw new Error('No comments found')
            const response: IResponse<IComment[] | IComment> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Comments found'
            }
            return response
        } catch(err: unknown){
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
            const isExist = await News.exists({_id: commentDto.news_id})
            if (!isExist) throw new Error('News with stated is does not exist')
            const comment = new Comment(commentDto)
            const data = await comment.save()
            const response: IResponse<IComment | null> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Comment added'
            }
            return response
        } catch(err: unknown){
            const error = err as Error 
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public deleteCommentById = async(id: string): Promise<IResponse<IComment | null>> => {
        try{
            const data = await Comment.findOneAndDelete({_id: id})
            if (!data) throw new Error('No comment found')
            const response: IResponse<IComment> = {
                status: EStatuses.SUCCESS,
                result: data,
                message: 'Deleted successfully'
            }
            return response
        } catch(err: unknown){
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

export const mongooseDB = new MongooseDB()
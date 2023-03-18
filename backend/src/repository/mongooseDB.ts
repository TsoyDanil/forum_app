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

dotenv.config()

export class MongooseDB {
    
    private client: Mongoose | null = null

    public close = async () => {
        if (!this.client) return 
        await this.client.disconnect()
    }

    public init = async (): Promise<void> => {
        try {
            this.client = await mongoose.connect(process.env.MONGO_CLIENT_URL || '')
            console.log('Server connected to MongoDB');
        } catch (err) {
            const error = err as Error;
            console.error('Connected error MongooseDB:', error);
        }
    }

    
}


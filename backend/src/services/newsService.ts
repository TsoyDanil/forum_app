import INews from "../interfaces/INews";
import { Request } from "express";
import INewsDto from "../interfaces/INewsDto";
import IResponse from "../interfaces/IResponse";
import { mongooseDB } from "../repository/mongooseDB";

export class NewsService {
    public getNews = async (req: Request): Promise<IResponse<INews[] | INews | null>> => {
        return await mongooseDB.getNews(req)
    }

    public addNew = async (newsDto: INewsDto): Promise<IResponse<INews | null>> => {
        return await mongooseDB.addNews(newsDto)
    }

    public deleteNewsById = async (id: string): Promise<IResponse<INews | null>> => {
        return await mongooseDB.deleteNewsById(id)
    }
}

export const newsService = new NewsService()
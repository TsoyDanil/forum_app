import { AxiosResponse } from "axios";
import { Types } from "mongoose";
import { EStatuses } from "../enum/EStatuses";
import INews from "../interfaces/INews";
import IResponse from "../interfaces/IResponse";
import { newsInstance } from "./instances";


class NewsApi {
    public getNews = async(): Promise<IResponse<INews[] | null>> => {
        try{
            const response = await newsInstance.get('/')
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

    public deleteNews = async(id: Types.ObjectId): Promise<IResponse<INews | null>> => {
        try{
            const response: AxiosResponse = await newsInstance.delete(`/${id}`)
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

    public getNewsById = async(id: Types.ObjectId): Promise<IResponse<INews | null>> => {
        try{
            const response: AxiosResponse = await newsInstance.get(`/${id}`)
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

    public addNews = async (newsDto: FormData): Promise<IResponse<INews | null>> => {
        try{
            const response = await newsInstance.post('/', newsDto)
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

export const newsApi = new NewsApi()
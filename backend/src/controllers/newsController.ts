import express, { Request, Response, Router } from "express";
import multer from "multer";
import shortid from "shortid";
import path from 'path'
import { EStatuses } from "../enum/EStatuses";
import { config } from "../index.config";
import INewsDto from "../interfaces/INewsDto";
import { newsService, NewsService } from "../services/newsService";


const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, config.filePath)
    },
    filename(req, file, callback){
        callback(null, shortid.generate() + path.extname(file.originalname))
    },
})

const upload = multer({storage})

export class NewsController {
    private router: Router
    private service: NewsService
    constructor() {
        this.router = express.Router()
        this.service = newsService
        this.router.get('/', this.getNews)
        this.router.get('/:id', this.getNews)
        this.router.post('/', upload.single('image'), this.addNews)
        this.router.delete('/:id', this.deleteNewsById)
    }

    public getRouter () {
        return this.router;
    }

    private getNews = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getNews(req)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private addNews = async (req: Request, res: Response): Promise<void> => {
        const newsDto: INewsDto = req.body
        newsDto.image = req.file ? req.file.filename : ''
        const response = await this.service.addNew(newsDto)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private deleteNewsById = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.deleteNewsById(req.params.id)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }
}
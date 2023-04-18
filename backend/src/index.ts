import express, { Express } from "express";
import cors from 'cors';
import { mongooseDB } from "./repository/mongooseDB";
import { HealthCheckController } from "./controllers/healthCheck";
import { NewsController } from "./controllers/newsController";
import { CommentsController } from "./controllers/commentsController";
import { config } from "./index.config";

class App {
    private app: Express
    constructor() {
        this.app = express()
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    public init = async(): Promise<void> => {
        try{
            this.app.use('/health-check', new HealthCheckController().getRouter())
            this.app.use('/news', new NewsController().getRouter())
            this.app.use('/comments', new CommentsController().getRouter())
            this.app.listen(config.port, () => {
                console.log(`Server is running on http://localhost:${config.port}`)
            })
            await mongooseDB.init()
            process.on('exit', () => {
                mongooseDB.close()
            })
        } catch(err: unknown){
            console.log(err);
        }
    }
}

const app = new App()

app.init()
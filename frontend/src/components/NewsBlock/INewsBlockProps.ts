import { MouseEvent, MouseEventHandler } from "react";
import INews from "../../interfaces/INews";

export default interface INewsBlockProps{
    newsData: INews
    goToFull: React.MouseEventHandler<HTMLButtonElement>
    deleteNews: React.MouseEventHandler<HTMLButtonElement>
}
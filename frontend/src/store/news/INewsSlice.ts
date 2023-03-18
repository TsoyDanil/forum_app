import IComment from "../../interfaces/IComment";
import INews from "../../interfaces/INews";

export default interface INewsSlice {
    newsLoading: boolean
    newsList: INews[]
    commentsList: IComment[]
    targetedNews: INews | null
}
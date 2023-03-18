import IComment from "./IComment";

export default interface ICommentDto {
    news_id: IComment['news_id']
    author?: IComment['author']
    comment: IComment['comment']
}


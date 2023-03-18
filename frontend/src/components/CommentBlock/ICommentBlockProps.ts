import IComment from "../../interfaces/IComment";

export default interface ICommentBlockProps {
    commentData: IComment
    deleteComment: React.MouseEventHandler<HTMLButtonElement>
}
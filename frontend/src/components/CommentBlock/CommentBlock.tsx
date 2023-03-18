import { FunctionComponent, ReactElement } from "react";
import ICommentBlockProps from "./ICommentBlockProps";
import styles from './CommentBlock.module.css'

const CommentBlock: FunctionComponent<ICommentBlockProps> = (props): ReactElement => {
    return(
        <div>
            <h2>{props.commentData.author}</h2>
            <p>{props.commentData.comment}</p>
            <button onClick={props.deleteComment}>Remove</button>
        </div>
    )
}

export default CommentBlock
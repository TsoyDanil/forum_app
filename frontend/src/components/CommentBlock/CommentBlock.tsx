import { FunctionComponent, ReactElement } from "react";
import ICommentBlockProps from "./ICommentBlockProps";
import styles from './CommentBlock.module.css'


const CommentBlock: FunctionComponent<ICommentBlockProps> = (props): ReactElement => {
    return(
        <div className={styles.CommentBlock}>
            <div>
                <h2>{props.commentData.author}</h2>
                <p>{props.commentData.comment}</p>
            </div>
            <button className={styles.Remove_button} onClick={props.deleteComment}></button>
        </div>
    )
}

export default CommentBlock
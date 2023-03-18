import mongoose, { Types } from "mongoose";
import { ChangeEvent, FunctionComponent, ReactElement, useEffect, useState, FormEvent } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentBlock from "../../components/CommentBlock/CommentBlock";
import IComment from "../../interfaces/IComment";
import ICommentDto from "../../interfaces/ICommentDto";
import INews from "../../interfaces/INews";
import { addComment, deleteComment, getCommentByNewsId, getNewsById } from "../../store/news/news.slice";
import { AppState, useAppDispatch } from "../../store/store";
import styles from './FullNewsBlock.module.css'

const FullNewsBlock: FunctionComponent = (): ReactElement => {

    const dispatch = useAppDispatch()

    const params = useParams()

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    const [commentDto, setCommentDto] = useState<ICommentDto>({
        author: '',
        comment: '',
        news_id: new mongoose.Types.ObjectId(params.id)
    })

    const {targetedNews, newsLoading, commentsList} = useSelector((state: AppState) => state.news, shallowEqual)

    const deleteCommentHandler = (id: Types.ObjectId) => {
        console.log(id);
        dispatch(deleteComment(id))
    }

    const checkButton = () => {
        commentDto.comment.trim() !== '' ? setButtonDisabled(false) : setButtonDisabled(true)
    }

    const handlerInputInsert = (e: ChangeEvent<HTMLInputElement>) => {
        setCommentDto(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const submitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addComment(commentDto))
        setCommentDto(
            {   
                author: '',
                comment: '',
                news_id: new mongoose.Types.ObjectId(params.id)
            }
        )
    }

    useEffect(() => {
        if (params.id){
            dispatch(getNewsById(new mongoose.Types.ObjectId(params.id)))
            dispatch(getCommentByNewsId(new mongoose.Types.ObjectId(params.id)))
        }
    }, [dispatch])

    useEffect(() => {
        checkButton()
    }, [commentDto])

    return(
        <div className={styles.FullNewsBlock}>
            {
                targetedNews ? 
                <>
                    <div className={styles.News_content}>
                        <h1>{targetedNews.header}</h1>
                        <p>At {new Date(targetedNews.timestamp).toLocaleString()}</p>
                        <p>{targetedNews.content}</p>
                    </div>
                    <div>
                        <h1>Add comment</h1>
                        <form className={styles.AddComment_form} onSubmit={submitHandler}>
                            <p>Author:</p>
                            <input 
                                name={'author'} 
                                onChange={handlerInputInsert} 
                                type={'text'} 
                                value={commentDto.author} 
                                placeholder={'Add author name...'}
                                autoComplete={'off'}
                            />
                            <p>Comment:</p>
                                <input 
                                    name={'comment'} 
                                    onChange={handlerInputInsert} 
                                    type={'text'} 
                                    value={commentDto.comment} 
                                    placeholder={'Add comment here...'}
                                    autoComplete={'off'}
                                />
                                <button
                                    disabled={buttonDisabled}
                                >Add comment</button>
                        </form>
                    </div>
                    <h1>Comments</h1>
                    {
                        commentsList.length ? 
                        commentsList.map((comment: IComment) => {
                            return <CommentBlock
                                        key={comment._id.toString()}
                                        commentData = {comment}
                                        deleteComment = {() => {deleteCommentHandler(comment._id)}}
                                    />
                            })
                            : <p>No comments yet</p>
                    }
                </>
                : <h1 style={{textAlign: 'center'}}>No Data Found</h1>
            }
        </div>
    )
}

export default FullNewsBlock
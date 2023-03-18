import { Types } from "mongoose";
import { FunctionComponent, ReactElement, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import INews from "../../interfaces/INews";
import { deleteNews, getNews, getNewsById } from "../../store/news/news.slice";
import { AppState, useAppDispatch } from "../../store/store";
import styles from './MainNewsPage.module.css'

const MainNewsPage: FunctionComponent = (): ReactElement => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {newsList, newsLoading} = useSelector((state: AppState) => state.news, shallowEqual)

    const deleteHandler = (id: Types.ObjectId) => {
        dispatch(deleteNews(id))
    }
    
    const goToFullNewsHandler = (id: Types.ObjectId) => {
        navigate({pathname: '/news/' + id})
        dispatch(getNewsById(id))
    }

    useEffect(() => {
        dispatch(getNews())
    }, [])

    return(
        <div className={styles.MainNewsPage}>
            {
                newsList.length ? 
                newsList.map((newsData: INews) => {
                    return <NewsBlock
                                key={newsData._id.toString()}
                                newsData={newsData}
                                deleteNews={() =>{deleteHandler(newsData._id)}}
                                goToFull={() => {goToFullNewsHandler(newsData._id)}}
                            />
                }) :
                <h1>No News yet</h1>
            }
        </div>
    )
}

export default MainNewsPage
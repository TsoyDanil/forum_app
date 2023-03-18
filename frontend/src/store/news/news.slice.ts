import { createSlice } from "@reduxjs/toolkit"
import { Types } from "mongoose"
import { commentsApi } from "../../api/commentsApi"
import { newsApi } from "../../api/newsApi"
import IComment from "../../interfaces/IComment"
import ICommentDto from "../../interfaces/ICommentDto"
import INews from "../../interfaces/INews"
import { createAppAsyncThunk } from "../createAppAsyncThunk"
import INewsSlice from "./INewsSlice"

const namespace: string = 'news'

export const getNews = createAppAsyncThunk(
    `${namespace}/getNews`,
    async () => {
        return newsApi.getNews()
    }
)

export const deleteNews = createAppAsyncThunk(
    `${namespace}/deleteNews`,
    async (id: Types.ObjectId) => {
        return newsApi.deleteNews(id)
    }
)

export const getNewsById = createAppAsyncThunk(
    `${namespace}/getNewsById`,
    async (id: Types.ObjectId) => {
        return newsApi.getNewsById(id)
    }
)

export const addNews = createAppAsyncThunk(
    `${namespace}/addNews`,
    async (newsDto: FormData, {dispatch}) => {
        await newsApi.addNews(newsDto)
        dispatch(getNews())
    }
)

export const getCommentByNewsId = createAppAsyncThunk(
    `${namespace}/getCommentByNewsId`,
    async (newsId: Types.ObjectId) => {
        return commentsApi.getCommentsByNewsId(newsId)
    }
)

export const addComment = createAppAsyncThunk(
    `${namespace}/addComment`,
    async (commentDto: ICommentDto) => {
        return commentsApi.addComment(commentDto)
    }
)

export const deleteComment = createAppAsyncThunk(
    `${namespace}/deleteComment`,
    async (id: Types.ObjectId) => {
        return commentsApi.deleteCommentById(id)
    }
)

export const newsSlice = createSlice({
    name: namespace,
    initialState: {
        newsLoading: false,
        commentsList: [],
        newsList: [],
        targetedNews: null
    } as INewsSlice,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getNews.pending, (state) => {
            state.newsLoading = true
        })
        .addCase(getNews.rejected, (state) => {
            state.newsLoading = false
        })
        .addCase(getNews.fulfilled, (state, action) => {
            if (action.payload.result) state.newsList = action.payload.result
            state.newsLoading = false
        })
        .addCase(getNewsById.pending, (state) => {
            state.newsLoading = true
        })
        .addCase(getNewsById.rejected, (state) => {
            state.targetedNews = {} as INews
            state.newsLoading = false
        })
        .addCase(getNewsById.fulfilled, (state, action) => {
            if (action.payload.result) state.targetedNews = action.payload.result
            state.newsLoading = false
        })
        .addCase(deleteNews.pending, (state) => {
            state.newsLoading = true
        })
        .addCase(deleteNews.rejected, (state) => {
            state.newsLoading = false
            state.targetedNews = null
        })
        .addCase(deleteNews.fulfilled, (state, action) => {
            if (action.payload.result) {
                state.newsList = state.newsList.filter((data: INews) => {
                    return data._id !== action.payload.result?._id
                })
            }
            state.newsLoading = false
        })
        .addCase(addNews.pending, (state) => {
            state.newsLoading = true
        })
        .addCase(addNews.rejected, (state) => {
            state.newsLoading = false
        })
        .addCase(addNews.fulfilled, (state) => {
            state.newsLoading = false
        })
        .addCase(getCommentByNewsId.pending, (state) => {
            state.newsLoading = true
        })
        .addCase(getCommentByNewsId.rejected, (state) => {
            state.newsLoading = false
        })
        .addCase(getCommentByNewsId.fulfilled, (state, action) => {
            state.newsLoading = false
            if (action.payload.result) state.commentsList = action.payload.result
        })
        .addCase(addComment.pending, (state) => {
            state.newsLoading = true
        })
        .addCase(addComment.rejected, (state) => {
            state.newsLoading = false
        })
        .addCase(addComment.fulfilled, (state, action) => {
            state.newsLoading = false
            if (action.payload.result) state.commentsList.push(action.payload.result)
        })
        .addCase(deleteComment.pending, (state) => {
            state.newsLoading = true
        })
        .addCase(deleteComment.rejected, (state) => {
            state.newsLoading = false
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
            state.newsLoading = false
            if (action.payload.result)  state.commentsList = state.commentsList.filter((comment: IComment) => {
                return comment._id !== action.payload.result?._id
            })
        })
    }
})
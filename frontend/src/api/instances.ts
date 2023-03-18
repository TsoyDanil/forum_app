import axios from "axios";

export const newsInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + 'news'
})

export const commentsInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + 'comments'
})
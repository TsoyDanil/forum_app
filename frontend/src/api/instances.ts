import axios from "axios";
import { baseUrl } from "./baseUrl";

export const newsInstance = axios.create({
    baseURL: baseUrl + 'news'
})

export const commentsInstance = axios.create({
    baseURL: baseUrl + 'comments'
})
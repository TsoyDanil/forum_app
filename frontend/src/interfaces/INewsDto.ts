import INews from "./INews"

export default interface INewsDto {
    header: INews['header']
    content: INews['content']
    image?: File | string
}


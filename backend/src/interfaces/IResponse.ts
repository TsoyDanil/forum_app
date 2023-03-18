import { EStatuses } from "../enum/EStatuses";

export default interface IResponse<T> {
    status: EStatuses
    result: T
    message: string
}
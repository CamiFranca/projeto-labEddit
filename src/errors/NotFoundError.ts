import {BaseError} from './BaseError'

export class NotFoundError extends BaseError{
    constructor(
        message: string = "Requisição inválida"
    ){super(400, message)}
}
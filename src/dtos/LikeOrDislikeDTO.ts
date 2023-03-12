import { BadRequestError } from "../errors/BadRequestError"

export interface LikeOrDislikeInputDTO{
    id: string,
    token:string,
    like:boolean
}
export interface LikeOrDislikeOutputDTO{
    id: string,
    token:string,
    like:boolean
}

export interface LikeOrDislikeDB{
    user_id: string, 
    post_id: string, 
    like: number
}
export class LikeOrDislikeDTO {

    public LikeOrDislike(
        id:string,
        token: string | undefined,
        like: boolean | undefined

    ): LikeOrDislikeInputDTO {

        if (typeof id !== "string") {
            throw new BadRequestError("Erro: O content precisa ser string.")
        }
        if (!token) {
            throw new BadRequestError("Erro: É preciso enviar um token")
        }
        if (typeof token !== "string") {
            throw new BadRequestError("Erro: O content precisa ser string.")
        }
        if (!like) {
            throw new BadRequestError("Erro: É preciso enviar um token")
        }
        if (typeof like !== "boolean") {
            throw new BadRequestError("Erro: O content precisa ser string.")
        }
        const dto: LikeOrDislikeInputDTO= {
            id,
            token,
            like
        }

        return dto
    }
}   
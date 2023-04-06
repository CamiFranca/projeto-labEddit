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

export interface LikeOrDislikeCommentsDB{
    user_id: string, 
    comment_id: string, 
    like: number
 }

 
export class LikeOrDislikeDTO {

    public LikeOrDislike(
        id:string,
        token: string | undefined,
        like: boolean | undefined

    ): LikeOrDislikeInputDTO {
        console.log(like,token, id)
        if (typeof id !== "string") {
            throw new BadRequestError("Erro: O id precisa ser string.")
        }
        if (!token) {
            throw new BadRequestError("Erro: É preciso enviar um token")
        }
        if (typeof token !== "string") {
            throw new BadRequestError("Erro: O token precisa ser string.")
        }
        if (like === undefined) {
            throw new BadRequestError("Erro: É preciso enviar um like ou dislike")
        }
      
        const dto: LikeOrDislikeInputDTO= {
            id,
            token,
            like
        }

        return dto
    }
} 
import { BadRequestError } from "../errors/BadRequestError"

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number
}

export interface GetPostBusiness {
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number
    creatorName: string

}

export interface GetPostOutputDTO {
    token: string
}

export interface getPostByIdInputDTO{
    id: string,
    token: string | undefined
}

// export interface PostWithUserDTO extends PostDB {
//     name: string

// }
export interface CreateInputPost {
    token: string,
    content: string
}

export interface CreateOutputPost {
    token: string,
    content: string
}

export interface EditPostInputDTO {
    id: string,
    token: string,
    content: string
}

export interface DeletePostInputDTO {
    id: string,
    token: string
}

export interface DeletePostOutputDTO {
    id: string,
    token: string
}

export interface postAndCreatorDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number
    creator_name: string
}

export interface LikeOrDislikePostDB {
    user_id: string,
    post_id: string
    like: number
}
export class PostDTO {

    public getPostsInputDTO(
        token: string | undefined

    ): GetPostOutputDTO {

        if (!token) {
            throw new BadRequestError("Erro: É preciso enviar um token")
        }
        if (typeof token !== "string") {
            throw new BadRequestError("Erro: O content precisa ser string.")
        }
        const dto: GetPostOutputDTO = {
            token
        }

        return dto
    }

    public editPostDTO(
        id: string,
        token: string | undefined,
        content: string | undefined
    ): EditPostInputDTO {

        if (!token) {
            throw new BadRequestError("Erro: É preciso enviar um token.")
        }
        if (!content) {
            throw new BadRequestError("Erro: É preciso enviar o content.")
        }
        if (typeof content !== "string") {
            throw new BadRequestError("Erro: O content precisa ser string.")
        }
        if (typeof token !== "string") {
            throw new BadRequestError("Erro: O content precisa ser string.")
        }
        const dto: EditPostInputDTO = {
            id,
            token,
            content
        }

        return dto
    }

    public createPostDTO(
        token: string | undefined,
        content: string | undefined
    ): CreateOutputPost {

        if (!token) {
            throw new BadRequestError("É preciso enviar um token.")
        }
        if (typeof token !== "string") {
            throw new BadRequestError("Erro: O content precisa ser string.")
        }
        if (!content) {
            throw new BadRequestError("É preciso enviar o content.")
        }
        if (typeof content !== "string") {
            throw new BadRequestError("Erro: O content precisa ser string.")
        }

        const dto: CreateOutputPost = {
            token,
            content
        }

        return dto
    }

    public deletePostDTO(
        id: string,
        token: string | undefined,

    ): DeletePostOutputDTO {

        if (!id) {
            throw new BadRequestError("É preciso enviar o content.")
        }
        if (!token) {
            throw new BadRequestError("É preciso enviar um token.")
        }
        if (typeof token !== "string") {
            throw new BadRequestError("Erro: O content precisa ser string.")
        }
        const dto: DeletePostOutputDTO = {
            id,
            token
        }

        return dto
    }

}
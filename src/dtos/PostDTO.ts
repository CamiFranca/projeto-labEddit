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

export interface EditPostOutputDTO {
    id: string,
    token: string,
    content: string
}

export interface GetPostOutputDTO {
    token: string
}

export class PostDTO {

    public getPostsInputDTO(
        token: string | undefined

    ): GetPostOutputDTO {

        if (!token) {
            throw new BadRequestError("É preciso enviar um token")
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
    ): EditPostOutputDTO {

        if (!token) {
            throw new BadRequestError("É preciso enviar um token.")
        }
        if (!content) {
            throw new BadRequestError("É preciso enviar o content.")
        }

        const dto: EditPostOutputDTO = {
            id,
            token,
            content
        }

        return dto
    }


    public CreatePostDTO(
        token: string | undefined,
        content: string | undefined
    ): CreateOutputPost  {

        if (!token) {
            throw new BadRequestError("É preciso enviar um token.")
        }
        if (!content) {
            throw new BadRequestError("É preciso enviar o content.")
        }

        const dto:CreateOutputPost = {
            token,
            content
        }

        return dto
    }

}
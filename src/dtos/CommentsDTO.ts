import { CommentsModel } from "../types"

export interface GetCommentInputDTO {
    postId:string 
    token: string | undefined, 
}

export type GetCommentsOutputDTO = CommentsModel[]

export interface CreateCommentsInputDTO {
    postId: string,
    token: string |undefined,
    comments: unknown
}
export interface EditCommentInputDTO {
    idToEdit: string,
    token: string |undefined,
    content: unknown
}
export interface DeleteCommentInputDTO {
    idToDelete: string,
    token: string |undefined
    
}

export interface LikedislikeCommentInputDTO {
    idLikeDislike: string,
    token: string | undefined,
    like: unknown
}

export interface LikeDislikeComentsDB{
    userId: string,
    commentId:string,
    like:number
}

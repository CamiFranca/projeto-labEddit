// import { BadRequestError } from "../errors/BadRequestError"
import { Posts } from "../models/Posts"
import { Users } from "../models/Users"

export interface GetPostOutputDTO {

    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }

}

export interface CreatePost {
    token: string,
    content: string
}

export interface EditPost {
    token: string,
    content: string
}


// export class PostDTO {

//     public getPostDTO(
//         id: unknown,
//         creatorId: unknown,
//         content: unknown,
//         likes: unknown,
//         dislikes: unknown,
//         createdAt: unknown,
//         updatedAt: unknown,
//         creator: {
//             id: unknown,
//             name: unknown
// ): GetPostOutputDTO {

//         if (typeof id !== "string") {
//             throw new BadRequestError("'name' deve ser string")
//         }

//         if (typeof creatorId !== "string") {
//             throw new BadRequestError("'email' deve ser string")
//         }

//         if (typeof content !== "string") {
//             throw new BadRequestError("'password' deve ser string")
//         }

//         if (typeof likes !== "number") {
//             throw new BadRequestError("'password' deve ser string")
//         }

//         if (typeof dislikes !== "number") {
//             throw new BadRequestError("'password' deve ser string")
//         }

//         if (typeof createdAt !== "string") {
//             throw new BadRequestError("'password' deve ser string")
//         }

//         if (typeof updatedAt !== "string") {
//             throw new BadRequestError("'password' deve ser string")
//         }

//         if (typeof creator.id !== "string") {
//             throw new BadRequestError("'password' deve ser string")
//         }

//         if (typeof creator.name !== "string") {
//             throw new BadRequestError("'password' deve ser string")
//         }
//         const dto: GetPostOutputDTO = {

//             id,
//             creatorId,
//             content,
//             likes,
//             dislikes,
//             createdAt,
//             updatedAt,
//             creator: {
//                 id,
//                 name

//             }

//         }

//         return dto
//     }
// }
// export interface GetPostOutputDTO {

//     public getPostOutput(): GetPostOutputDTO {

//     const dto: GetPostOutputDTO = {

//         id: post.getId(),
//         creatorId: post.getCreator_id(),
//         content: post.content(),
//         likes: post.getLikes(),
//         dislikes: post.getDislikes(),
//         comment:
//             creator: {
//                 id: post.getCreator_id(),
//                 name: user.getName()
// }
//     }
// }
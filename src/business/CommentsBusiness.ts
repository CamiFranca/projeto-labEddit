// import { CommentsDatabase } from "../database/CommentsDatabase";
// import { GetCommentInputDTO, GetCommentsOutputDTO } from "../dtos/CommentsDTO";
// import { BadRequestError } from "../errors/BadRequestError";
// import { NotFoundError } from "../errors/NotFoundError";
// import { Comments } from "../models/Comments";
// import { HashManager } from "../services/HashManager";
// import { IdGenerator } from "../services/IdGenerator";
// import { TokenManager } from "../services/TokenManager";

// export class CommentsBusiness {
//     constructor(
//         private commentsDataBase: CommentsDatabase,
//         private idGenerator: IdGenerator,
//         private tokenManager: TokenManager,
//         private hashManager: HashManager
//     ) { }

//     public getAllComments = async (input: GetCommentInputDTO): Promise<{}[]> => {

//         const { token, postId } = input
// //criar o dto para verificar a chegada do input no tipo undefined
//         const tokenValid = this.tokenManager.getPayload(token)

//         if (tokenValid === null) {
//             throw new BadRequestError("ERRO: O token é inválido.")

//         }

//         // const commentsDB = await this.commentsDataBase.getAllComments(postId)

//         // const instanceComments = commentsDB.map((comment) => {
//         //     const comments = new Comments(
//         //         comment.id,
//         //         comment.creator_id,
//         //         comment.post_id,
//         //         comment.comments,
//         //         comment.likes,
//         //         comment.dislikes,
           
//         //     )
//         //     return comments.toBusinessModel()
//         // })

//         // let UserAndComments: {}[] = []

//         // for (const comment of instanceComments) {
//         //     const commentDB = await this.commentsDataBase.getAllComments(comment.creatorId)
//         //     const styleGetComments = {
//         //         id: comment.id,
//         //         creatorId: comment.creatorId,
//         //         comments: comment.comments,
//         //         likes: comment.likes,
//         //         dislikes: comment.dislikes,
            
//         //     }
//         //     UserAndComments.push(styleGetComments)
//         // }


//         // return UserAndComments

//     }
// }
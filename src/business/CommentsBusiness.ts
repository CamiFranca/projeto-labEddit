import { CommentsDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreateCommentsInputDTO, GetCommentInputDTO, GetCommentsOutputDTO, LikeDislikeComentsDB, LikedislikeCommentInputDTO } from "../dtos/CommentsDTO";
import { LikeOrDislikeCommentsDB } from "../dtos/LikeOrDislikeDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Comments } from "../models/Comments";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { COMMENT_LIKE, TokenPayload } from "../types";

export class CommentsBusiness {
    constructor(
        private commentsDataBase: CommentsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,

    ) { }

    public getCommentsByPostId = async (input: GetCommentInputDTO): Promise<{}[]> => {

        const { postId, token } = input
        //criar o dto para verificar a chegada do input no tipo undefined

        if (token === undefined) {
            throw new BadRequestError("ERRO: É preciso enviar um token.")
        }

        const tokenValid = this.tokenManager.getPayload(token)

        if (tokenValid === null) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }

        const commentsByPostIdDB = await this.commentsDataBase.getCommentsByPostId(postId)

        let userWithComments : {}[] = []

        for (const comment of commentsByPostIdDB) {
            const userDB = await this.commentsDataBase.getUserById(comment.creator_id)
            const styleGetComment = {
                id: comment.id,
                creatorNickName: userDB.nick_name,
                comment: comment.comments,
                likes: comment.likes,
                dislikes: comment.dislikes,
               
            }
            userWithComments.push(styleGetComment)
        }

        return userWithComments

        
    }

    public createComments = async (input: CreateCommentsInputDTO): Promise<void> => {

        const { postId, token, comments } = input
        //criar o dto para verificar a chegada do input no tipo undefined

        if (token === undefined) {
            throw new BadRequestError("ERRO: É preciso enviar um token.")
        }

        const tokenValid = this.tokenManager.getPayload(token)

        if (tokenValid === null) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }
        if (typeof comments !== "string") {
            throw new BadRequestError("ERRO: Comments precisa ser string.")

        }
        const findPostByIdDB = await this.postDatabase.findPostById(postId)

        if (!findPostByIdDB) {
            throw new BadRequestError("ERRO:Post não encontrado.")
        }

        const id = this.idGenerator.generate()

        const instanceComments = new Comments(
            id,
            postId,
            comments,
            0,
            0,
            tokenValid

        )

        const commentsDB = instanceComments.toDBModel()

        await this.commentsDataBase.insert(commentsDB)


    }
    public likeOrDislikeComments = async (input: LikedislikeCommentInputDTO): Promise<void> => {

        const { idLikeDislike, token, like } = input

        if (token === undefined) {
            throw new BadRequestError("ERRO: token não existe")
        }

        if (typeof token !== "string") {
            throw new BadRequestError("ERRO: token precisa ser string.")
        }
        if (like === undefined) {
            throw new BadRequestError("ERRO: envie o like.")
        }

        if (typeof like !== "boolean") {
            throw new BadRequestError("ERRO: token precisa ser boolean.")
        }

        const tokenValid = this.tokenManager.getPayload(token)

        if (!tokenValid) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }
        const commentsAndCreatorDB = await this.commentsDataBase.findCommentsAndUserById(idLikeDislike)

        if (!commentsAndCreatorDB) {
            throw new NotFoundError("Erro: O id não foi encontrado.")

        }

        const creatorId = tokenValid.id
        const modelLikeForDB = like ? 1 : 0
        const postId = commentsAndCreatorDB.id

        const formatLikeDislikeDB: LikeOrDislikeCommentsDB= {
            userId: creatorId,
            commentId: commentsAndCreatorDB.id,
            like: modelLikeForDB
        }

        const objectCreator: TokenPayload = {
            id: tokenValid.id,
            nick_name: tokenValid.nick_name,
            role: tokenValid.role
        }

        const comment = new Comments(
            commentsAndCreatorDB.id,
            commentsAndCreatorDB.post_id,
            commentsAndCreatorDB.comments,
            commentsAndCreatorDB.likes,
            commentsAndCreatorDB.dislikes,
            objectCreator

        )

        const likeOrDislikeExist = await this.commentsDataBase.searchLikeDislike(formatLikeDislikeDB)

        if (likeOrDislikeExist === COMMENT_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.commentsDataBase.removeLikeDislike(formatLikeDislikeDB)
                comment.deleteLike()
            } else {
                await this.commentsDataBase.updateLikeDislike(formatLikeDislikeDB)
                comment.deleteLike()
                comment.addDeslike()
            }
        } else if (likeOrDislikeExist === COMMENT_LIKE.ALREADY_DISLIKED) {
            if (like) {
                await this.commentsDataBase.updateLikeDislike(formatLikeDislikeDB)
                comment.deleteDeslike()
                comment.addLike()
            } else {
                await this.commentsDataBase.removeLikeDislike(formatLikeDislikeDB)
                comment.deleteDeslike()
         
            }
        } else {
            await this.commentsDataBase.commentsLikeOrDislike(formatLikeDislikeDB)

            if (like) {
                comment.addLike()
            } else {
                comment.addDeslike()
            }
        }
        const updateCommentDB = comment.toDBModel()
        await this.commentsDataBase.update(idLikeDislike, updateCommentDB)

    }

}

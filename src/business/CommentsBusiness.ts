import { CommentsDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreateCommentsInputDTO, GetCommentInputDTO, GetCommentsOutputDTO, LikeDislikeComentsDB, LikedislikeCommentInputDTO } from "../dtos/CommentsDTO";
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

    public getAllComments = async (input: GetCommentInputDTO): Promise<GetCommentsOutputDTO> => {

        const { post_id, token } = input
        //criar o dto para verificar a chegada do input no tipo undefined

        if (token === undefined) {
            throw new BadRequestError("ERRO: É preciso enviar um token.")
        }

        const tokenValid = this.tokenManager.getPayload(token)

        if (tokenValid === null) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }

        const commentsByIdDB = await this.commentsDataBase.getAllComments(post_id)

        const getUsers = await this.userDatabase.getAllUsersComments()

        const instanceComments = commentsByIdDB.map((comment) => {
            const findUsers = getUsers.find((user) => user.id === comment.creator_id)
            if (!findUsers) {
                throw new NotFoundError("ERRO: usuário não encontrado.")
            }

            const userRoleComment: TokenPayload = {
                id: findUsers.id,
                nick_name: findUsers.nick_name,
                role: findUsers.role
            }
            const comments = new Comments(
                comment.id,
                comment.post_id,
                comment.comments,
                comment.likes,
                comment.dislikes,
                userRoleComment
            )
            return comments.toBusinessModel()
        })

        const output: GetCommentsOutputDTO = instanceComments

        return output

    }

    public createComments = async (input: CreateCommentsInputDTO): Promise<void> => {

        const { post_id, token, comments } = input
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
        const findPostByIdDB = await this.postDatabase.findPostById(post_id)

        if (!findPostByIdDB) {
            throw new BadRequestError("ERRO:Post não encontrado.")
        }

        const id = this.idGenerator.generate()

        const instanceComments = new Comments(
            id,
            post_id,
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

        const formatLikeDislikeDB: LikeDislikeComentsDB= {
            user_id: creatorId,
            comment_id: commentsAndCreatorDB.id,
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

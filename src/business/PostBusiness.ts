import { PostDatabase } from "../database/PostDatabase";
import { CreateOutputPost, DeletePostInputDTO, EditPostInputDTO, GetPostOutputDTO } from "../dtos/PostDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Posts } from "../models/Posts";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { USER_ROLES } from "../types";

export class PostBusiness {
    constructor(
        private postDataBase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
    ) { }

    public getPost = async (input: GetPostOutputDTO): Promise<{}[]> => {

        const { token } = input

        const tokenValid = this.tokenManager.getPayload(token)

        if (tokenValid === null) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }

        const postsDB = await this.postDataBase.getPosts()

        const instancePosts = postsDB.map((post) => {
            const posts = new Posts(
                post.id,
                post.creator_id,
                post.content,
                post.likes,
                post.dislikes,
                post.comments
             
            )
            return posts.toBusinessModel()
        })

        let UserAndPost: {}[] = []

        for (const post of instancePosts) {
            const userDB = await this.postDataBase.getUserById(post.creatorId)
            const styleGetPost = {
                id: post.id,
                creatorId: post.creatorId,
                content: post.content,
                likes: post.likes,
                dislikes: post.dislikes,
                comments: post.comments,
            }
            UserAndPost.push(styleGetPost)
        }


        return UserAndPost

    }

    public createPost = async (input: CreateOutputPost): Promise<void> => {

        const { token, content } = input

        const tokenValid = this.tokenManager.getPayload(token)

        if (tokenValid === null) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }

        if (content.length < 1) {
            throw new BadRequestError("ERRO: É preciso enviar o content.")

        }

        const idNewPost = this.idGenerator.generate()
        const creatorId = tokenValid.id


        const instancePost = new Posts(
            idNewPost,
            creatorId,
            content,
            0,
            0,
            0
        )

        const postDB = instancePost.toDBModel()

        await this.postDataBase.insertNewPost(postDB)

    }

    public editPost = async (input: EditPostInputDTO): Promise<void> => {

        const { id, token, content } = input


        const tokenValid = this.tokenManager.getPayload(token)

        if (tokenValid === null) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }

        if (content.length < 1) {
            throw new BadRequestError("ERRO: É preciso enviar o content.")

        }

        if (id === undefined) {
            throw new BadRequestError("ERRO: envie o valor do id.")

        }

        const searchPostById = await this.postDataBase.findPostById(id)

        if (!searchPostById) {
            throw new NotFoundError("ERRO: Id não encontrado.")
        }

        const creatorId = tokenValid.id

        if (searchPostById.creator_id !== creatorId) {
            throw new BadRequestError("ERRO: Só o dono da conta pode editar o content.")

        }

        const instancePosts = new Posts(
            searchPostById.id,
            searchPostById.creator_id,
            searchPostById.content,
            searchPostById.likes,
            searchPostById.dislikes,
            searchPostById.comments,
        )

        instancePosts.setContent(content)

        const updatedContent = instancePosts.toDBModel()

        await this.postDataBase.update(id, updatedContent)

    }

    public deletePost = async (input: DeletePostInputDTO): Promise<void> => {

        const { id, token } = input

        const tokenValid = this.tokenManager.getPayload(token)

        if (!tokenValid) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }
        const searchPostById = await this.postDataBase.findPostById(id)

        if (!searchPostById) {

            throw new NotFoundError("Erro: O id não foi encontrado.")


        }

        const creatorId = tokenValid.id


        if (tokenValid.role !== USER_ROLES.ADMIN &&
            searchPostById.creator_id !== creatorId) {
            throw new BadRequestError("ERRO: Só o dono da conta pode editar o content.")

        }

        await this.postDataBase.deletePostById(id)

    }

    public likeOrDislike = async (input: LikeOrDislikeOutputDTO): Promise<void> => {

        const { id, token, like } = input

        const tokenValid = this.tokenManager.getPayload(token)

        if (!tokenValid) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }
        const postAndCreatorDB = await this.postDataBase.findPostAndUserById(id)

        if (!postAndCreatorDB) {
            throw new NotFoundError("Erro: O id não foi encontrado.")

        }

        const userId = tokenValid.id
        const modelLikeForDB = like ? 1 : 0
        const postId = postAndCreatorDB.id


        const formatLikeDislikeDB: LikeOrDislikeDB = {
            user_id: userId,
            post_id: postId,
            like: modelLikeForDB
        }

        await this.postDataBase.likeOrDislike(formatLikeDislikeDB)

        const post = new Posts(
            postAndCreatorDB.id,
            postAndCreatorDB.creator_id,
            postAndCreatorDB.content,
            postAndCreatorDB.likes,
            postAndCreatorDB.dislikes,
            postAndCreatorDB.comments,
            // postAndCreatorDB.creator_name
        )

        like ? post.addLike() : post.addDislike()

        const updatePostDB = post.toDBModel()

        await this.postDataBase.update(id, updatePostDB)
      

        if (searchPostById.creator_id !== creatorId) {
            throw new BadRequestError("ERRO: Só o dono da conta pode editar o content.")

        }

    }
}

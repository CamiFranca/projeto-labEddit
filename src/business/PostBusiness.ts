import { PostDatabase } from "../database/PostDatabase";
import { EditPostOutputDTO, GetPostOutputDTO, PostDB } from "../dtos/PostDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Posts } from "../models/Posts";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postDataBase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
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
                post.comments,
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
                creatorName: userDB.nick_name
            }
            UserAndPost.push(styleGetPost)
        }


        return UserAndPost

    }

    public editPost = async (input: EditPostOutputDTO): Promise<void> => {

        const { id, token, content } = input

        const tokenValid = this.tokenManager.getPayload(token)

        if (tokenValid === null) {
            throw new BadRequestError("ERRO: O token é inválido.")

        }

        if (content.length < 1) {
            throw new BadRequestError("ERRO: É preciso enviar o content.")

        }
        const editSearchById = await this.postDataBase.findPostById(id)

        if (editSearchById === null) {
            throw new NotFoundError("ERRO: Id não encontrado.")
        }

        const creatorId = tokenValid.id

        if(editSearchById?.id !== creatorId){
            throw new BadRequestError("ERRO: Só o dono da conta pode editar o content.")

        }

        const instancePosts = new Posts(
            editSearchById.id,
            editSearchById.creator_id,
            editSearchById.content,
            editSearchById.likes,
            editSearchById.dislikes,
            editSearchById.comments,
        )

        instancePosts.setContent(content)

        const updatedContent = instancePosts.toDBModel()

        await this.postDataBase.update(id, updatedContent)





    }
}

import express from "express"
import { CommentsBusiness } from "../business/CommentsBusiness"
import { CommmentsController } from "../controller/CommentsController"
import { CommentsDatabase } from "../database/CommentsDatabase"
import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const commentsRouter = express.Router()

const commmentsController = new CommmentsController(
    new CommentsBusiness(
        new CommentsDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new PostDatabase(),
        new UserDatabase()
    )
    //  new commentsDTO

)

commentsRouter.get("/post/:id", commmentsController.getCommentsByPostId)
commentsRouter.post("/:id", commmentsController.createComments)
commentsRouter.put("/:id/like", commmentsController.likeOrDislikeComments)


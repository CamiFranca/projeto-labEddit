import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDatabase"
import { LikeOrDislikeDTO } from "../dtos/LikeOrDislikeDTO"
import { PostDTO } from "../dtos/PostDTO"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager(),
      
    ),
    new PostDTO(),
    new LikeOrDislikeDTO
)
postRouter.get("/", postController.getPosts)
postRouter.get("/:id", postController.getPostsById)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/:id/like", postController.likeOrDislike)
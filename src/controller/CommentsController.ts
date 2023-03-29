import { Request, Response } from "express"
import { CommentsBusiness } from "../business/CommentsBusiness";
import { CreateCommentsInputDTO, GetCommentInputDTO, LikedislikeCommentInputDTO } from "../dtos/CommentsDTO";
import { BaseError } from "../errors/BaseError";

export class CommmentsController {
    constructor(

        private commentsBusiness: CommentsBusiness,
        // private CommentsDTO: Comments

    ) { }

    public getCommentsByPostId = async (req: Request, res: Response) => {

        try {
            const input: GetCommentInputDTO = {
                postId: req.params.id,
                token: req.headers.authorization
            }
 
            const output = await this.commentsBusiness.getCommentsByPostId(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    public createComments = async (req: Request, res: Response) => {

        try {
            const input: CreateCommentsInputDTO = {
                postId: req.params.id,
                token: req.headers.authorization,
                comments : req.body.comments
            }
            console.log("CONTROLLER",input)

            const output = await this.commentsBusiness.createComments(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

    public likeOrDislikeComments = async (req: Request, res: Response) => {

        try {
            const input : LikedislikeCommentInputDTO = {
                idLikeDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }
            

            await this.commentsBusiness.likeOrDislikeComments(input)

            res.status(200).end()

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }

}

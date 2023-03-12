import { Request, Response } from "express"
import { CommentsBusiness } from "../business/CommentsBusiness";
import { CreateCommentsInputDTO, GetCommentInputDTO } from "../dtos/CommentsDTO";
import { BaseError } from "../errors/BaseError";

export class CommmentsController {
    constructor(

        private commentsBusiness: CommentsBusiness,
        // private CommentsDTO: Comments

    ) { }

    public getAllComments = async (req: Request, res: Response) => {

        try {
            const input: GetCommentInputDTO = {
                post_id: req.params.id,
                token: req.headers.authorization
            }
 
            const output = await this.commentsBusiness.getAllComments(input)

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
                post_id: req.params.id,
                token: req.headers.authorization,
                comments : req.body.comments
            }
 
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
}
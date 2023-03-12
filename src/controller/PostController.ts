import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness";
import { LikeOrDislikeDTO } from "../dtos/LikeOrDislikeDTO";
import { PostDTO } from "../dtos/PostDTO";
import { BaseError } from "../errors/BaseError";

export class PostController {
    constructor(

        private postBusiness: PostBusiness,
        private postDTO: PostDTO,
        private likeOrDislikeDTO: LikeOrDislikeDTO

    ) { }

    public getPosts = async (req: Request, res: Response) => {

        try {

            const input = this.postDTO.getPostsInputDTO(
                req.headers.authorization
            )

            const output = await this.postBusiness.getPost(input)
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


    public createPost = async (req: Request, res: Response) => {

        try {
            const input = this.postDTO.createPostDTO(
                req.headers.authorization,
                req.body.content
            )

            await this.postBusiness.createPost(input)

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


    public editPost = async (req: Request, res: Response) => {

        try {
            const input = this.postDTO.editPostDTO(
                req.params.id,
                req.headers.authorization,
                req.body.content
            )

            await this.postBusiness.editPost(input)

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


    public deletePost = async (req: Request, res: Response) => {

        try {
            const input = this.postDTO.deletePostDTO(
                req.params.id,
                req.headers.authorization,
              
            )

            await this.postBusiness.deletePost(input)

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


    public likeOrDislike = async (req: Request, res: Response) => {

        try {
            const input = this.likeOrDislikeDTO.LikeOrDislike(
                req.params.id,
                req.headers.authorization,
                req.body.like
              
            )

            await this.postBusiness.likeOrDislike(input)

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

 main
}
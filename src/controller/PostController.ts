import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness";
import { PostDTO } from "../dtos/PostDTO";
import { BaseError } from "../errors/BaseError";

export class PostController {
    constructor(

        private postBusiness: PostBusiness,
        private postDTO : PostDTO

    ) { }

    public getPosts = async (req:Request, res:Response)=>{

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


    public editPost = async (req:Request, res:Response):Promise<void>=>{

        try {
            const input = this.postDTO.editPostDTO(
                 req.params.id,
                 req.headers.authorization,
                 req.body.content  
            )
console.log(input)
            const output = await this.postBusiness.editPost(input)

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
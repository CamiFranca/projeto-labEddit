// import { Request, Response } from "express"
// import { PostBusiness } from "../business/PostBusiness";
// import { PostDTO } from "../dtos/PostDTO";
// import { BaseError } from "../errors/BaseError";

// export class CommmentsController {
//     constructor(

//         private commentsBusiness: CommentsBusiness,
//         private CommentsDTO: CommentsDTO

//     ) { }

//     public getAllComments = async (req: Request, res: Response) => {

//         try {



//         } catch (error) {
//             console.log(error)

//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro inesperado.")
//             }
//         }
//     }
// }
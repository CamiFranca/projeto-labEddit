import { CommentsDatabaseMock } from "../CommentsDatabaseMock"
import { CommentsBusiness } from "../../../src/business/CommentsBusiness"
import { IdGeneratorMock } from "../IdGeneratorMock"
import { TokenManagerMock } from "../TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { PostDatabaseMock } from "../PostDatabaseMock"
import { LikedislikeCommentInputDTO } from "../../../src/dtos/CommentsDTO"


describe("likeOrDislikeCommentsDB", () => {
    const commentsBusiness = new CommentsBusiness(
        new CommentsDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new PostDatabaseMock()
    )
    test("verifica se o token é undefined", async () => {
        try {
            const input :LikedislikeCommentInputDTO = {
                idLikeDislike: "id-mock-likeDislike",
                token: undefined,
                like: 1
            }

            await commentsBusiness.likeOrDislikeComments(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O token não existe")
                expect(error.statusCode).toBe(400)
            }
        }


    })
    // test("verifica se o token é string", async () => {
    //     try {
    //         const input :LikedislikeCommentInputDTO = {
    //             idLikeDislike: "id-mock-likeDislike",
    //             token: boolean,
    //             like: "like"
    //         } 

    //      await commentsBusiness.likeOrDislikeComments(input)


    //     } catch (error) {
    //         if (error instanceof BadRequestError) {
    //             expect(error.message).toBe("ERRO: token precisa ser string.")
    //             expect(error.statusCode).toBe(400)
    //         }
    //     }


    // })

    test("verifica se o like é undefined", async () => {
        try {
            const input :LikedislikeCommentInputDTO = {
                idLikeDislike: "id-mock-likeDislike",
                token: "token-mock-normal",
                like: undefined
            }

            await commentsBusiness.likeOrDislikeComments(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: envie o like.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("verifica se o like é do tipo boolean", async () => {
        try {
            const input :LikedislikeCommentInputDTO = {
                idLikeDislike: "id-mock-likeDislike",
                token: "token-mock-normal",
                like: "string"
            }

            await commentsBusiness.likeOrDislikeComments(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: like precisa ser boolean.")
                expect(error.statusCode).toBe(400)
            }
        }


    })
 
    test("verifica se o id existe", async () => {
        try {
            const input :LikedislikeCommentInputDTO = {
                idLikeDislike: undefined,
                token: "token-mock-normal",
                like: 1
            }

            await commentsBusiness.likeOrDislikeComments(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: envie um id")
                expect(error.statusCode).toBe(400)
            }
        }


    })



})

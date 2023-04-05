import { CommentsDatabaseMock } from "../CommentsDatabaseMock"
import { CommentsBusiness } from "../../../src/business/CommentsBusiness"
import { IdGeneratorMock } from "../IdGeneratorMock"
import { TokenManagerMock } from "../TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { PostDatabaseMock } from "../PostDatabaseMock"
import { GetCommentInputDTO } from "../../../src/dtos/CommentsDTO"


describe("geCommentsByPostId", () => {
    const commentsBusiness = new CommentsBusiness(
        new CommentsDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new PostDatabaseMock()
    )
    test("verifica se o token é válido", async () => {
        try {
            const input: GetCommentInputDTO = {
                postId: "id-mock",
                token: "id-post"
            }

            await commentsBusiness.getCommentsByPostId(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O token é inválido.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("verifica se o id é válido", async () => {
        try {
            const input: GetCommentInputDTO = {
                postId: "id",
                token: "token-mock-normal"
            }

            await commentsBusiness.getCommentsByPostId(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O id não foi encontrado.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("retorna os comentários por id", async () => {


        const input: GetCommentInputDTO = {
            postId: "id-mock-post",
            token: "token-mock-normal"
        }

        const response = await commentsBusiness.getCommentsByPostId(input)

        expect(response).toEqual(
            [
                {
                    id: "id-mock-comments",
                    creatorNickName: "Normal mock",
                    comment: "teste",
                    likes: 2,
                    dislikes: 2
                }
            ]

        )


    })

})

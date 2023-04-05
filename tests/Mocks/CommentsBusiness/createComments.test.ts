import { PostDatabaseMock } from "../PostDatabaseMock"
import { IdGeneratorMock } from "../IdGeneratorMock"
import { TokenManagerMock } from "../TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { CreateCommentsInputDTO } from "../../../src/dtos/CommentsDTO"
import { CommentsBusiness } from "../../../src/business/CommentsBusiness"
import { CommentsDatabaseMock } from "../CommentsDatabaseMock"


describe("createComments", () => {
    const commentsBusiness = new CommentsBusiness(
        new CommentsDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new PostDatabaseMock()
    )
    test("verifica se o token é válido", async () => {
        try {
            const input: CreateCommentsInputDTO = {
                postId: "id-mock",
                token: "id-post",
                comments: "teste"
            }


            await commentsBusiness.createComments(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O token é inválido.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("testando se o token é undefined", async () => {
        const input: CreateCommentsInputDTO = {
            postId: "id-mock",
            token: undefined,
            comments: "teste"
        }

        try {
            await commentsBusiness.createComments(input)
            // Se a função não lançar uma exceção, o teste falhará
            fail("A exceção esperada não foi lançada")
        } catch (error) {
            {
                if (error instanceof BadRequestError) {
                    expect(error.message).toBe("ERRO: É preciso enviar um token.")
                    expect(error.statusCode).toBe(400)
                }
            }
        }
    })


    test("verifica se o comment é string", async () => {
        try {
            const input: CreateCommentsInputDTO = {
                postId: "id-mock",
                token: "token-mock-normal",
                comments: null
            }


         await commentsBusiness.createComments(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: Comments precisa ser string.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    //     test("verifica se o post foi criado", async () => {


    //         const input: CreateCommentsInputDTO = {
    //             postId: "id-mock",
    //             token: "token-mock-normal",
    //             comments: "teste"
    //         }

    //       await commentsBusiness.createComments(input)

    //     })
})
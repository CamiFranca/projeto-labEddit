import { GetPostOutputDTO } from "../../../src/dtos/PostDTO"
import { PostDatabaseMock } from "../../Mocks/PostDatabaseMock"
import { PostBusiness } from "../../../src/business/PostBusiness"
import { IdGeneratorMock } from "../IdGeneratorMock"
import { TokenManagerMock } from "../TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { getPostByIdInputDTO } from "../../../src/dtos/PostDTO"


describe("getPostById",()=>{
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test("verifica se o token é válido", async () => {
        try {
            const input: getPostByIdInputDTO = {
                id: "id-mock",
                token: "id-post"
            }

         await postBusiness.getPostById(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O token é inválido.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("verifica se o id é válido", async () => {
        try {
            const input: getPostByIdInputDTO = {
                id: "id",
                token: "token-mock-normal"
            }

         await postBusiness.getPostById(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O id não existe.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("retorna um post por id", async () => {


        const input: getPostByIdInputDTO = {
            id: "id-mock-post",
            token: "token-mock-normal"
        }

     const response = await postBusiness.getPostById(input)

        expect(response).toEqual({

            id: "id-mock-post",
            creatorId:"id-mock",
            content: "realizando testes",
            likes: 1,
            dislikes: 2,
            comments: 0,
            nickName:"Normal mock"

        })


    })
})
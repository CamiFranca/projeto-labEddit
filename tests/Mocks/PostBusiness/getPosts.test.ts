import { PostDatabaseMock } from "../../Mocks/PostDatabaseMock"
import { PostBusiness } from "../../../src/business/PostBusiness"
import { IdGeneratorMock } from "../IdGeneratorMock"
import { TokenManagerMock } from "../TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { getPostByIdInputDTO } from "../../../src/dtos/PostDTO"
import { GetPostOutputDTO } from "../../../src/dtos/PostDTO"


describe("getPosts", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("verifica se o token é válido", async () => {
        try {
            const input: GetPostOutputDTO = {
                token: "id-post"
            }

         await postBusiness.getPost(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O token é inválido.")
                expect(error.statusCode).toBe(400)
            }
        }


    })


    test("retornar uma lista de posts", async () => {


        const input: GetPostOutputDTO = {
            token: "token-mock-normal"
        }

        const response = await postBusiness.getPost(input)
        expect(response).toEqual([{

            id: "id-mock-post",
            creatorNickName: "Normal mock",
            content: "realizando testes",
            likes: 1,
            dislikes: 2,
            comments: 0

        }])


    })

})
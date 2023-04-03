import { CreateOutputPost, GetPostOutputDTO } from "../../../src/dtos/PostDTO"
import { PostDatabaseMock } from "../PostDatabaseMock"
import { PostBusiness } from "../../../src/business/PostBusiness"
import { IdGeneratorMock } from "../IdGeneratorMock"
import { TokenManagerMock } from "../TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { getPostByIdInputDTO } from "../../../src/dtos/PostDTO"


describe("createPost",()=>{
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test("verifica se o token é válido", async () => {
        try {
            const input: CreateOutputPost = {
                token: "id-post",
                content:"realizando testes"
            }

         await postBusiness.createPost(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O token é inválido.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("verifica se o content é válido", async () => {
        try {
            const input: CreateOutputPost = {
                token: "token-mock-normal",
                content:" "
            }


         await postBusiness.createPost(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: É preciso enviar o content.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("verifica se o post foi criado", async () => {


        const input: CreateOutputPost = {
            token: "token-mock-normal",
            content:"realizando testes"
        }

      await postBusiness.createPost(input)

    })
})
import { EditPostInputDTO,  } from "../../../src/dtos/PostDTO"
import { PostDatabaseMock } from "../PostDatabaseMock"
import { PostBusiness } from "../../../src/business/PostBusiness"
import { IdGeneratorMock } from "../IdGeneratorMock"
import { TokenManagerMock } from "../TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"


describe("editPost",()=>{
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test("verifica se o token é válido", async () => {
        try {
            const input: EditPostInputDTO = {
                id:"id-mock-post",
                token: "id-post",
                content:"realizando testes"
            }

         await postBusiness.editPost(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O token é inválido.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("verifica se o id é válido", async () => {
        try {
            const input: EditPostInputDTO = {
                id:"id-mock",
                token:"token-mock-normal",
                content:"realizando testes"
            }


         await postBusiness.editPost(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: Id não encontrado.")
                expect(error.statusCode).toBe(404)
            }
        }


    })

    test("verifica se o post foi editado", async () => {


        const input: EditPostInputDTO = {
            id:"id-mock-post",
            token:"token-mock-normal",
            content:"realizando testes"
        }

      await postBusiness.editPost(input)

    })

    test("verifica se o contentfoi enviado", async () => {
        try {
            const input: EditPostInputDTO = {
                id:"id-mock-post",
                token:"token-mock-normal",
                content: " "
            }


         await postBusiness.editPost(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: É preciso enviar o content.")
                expect(error.statusCode).toBe(400)
            }
        }


    })
})
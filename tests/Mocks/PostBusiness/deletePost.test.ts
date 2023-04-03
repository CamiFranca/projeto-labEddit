import { CreateOutputPost, DeletePostInputDTO, GetPostOutputDTO } from "../../../src/dtos/PostDTO"
import { PostDatabaseMock } from "../PostDatabaseMock"
import { PostBusiness } from "../../../src/business/PostBusiness"
import { IdGeneratorMock } from "../IdGeneratorMock"
import { TokenManagerMock } from "../TokenManagerMock"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { getPostByIdInputDTO } from "../../../src/dtos/PostDTO"


describe("deletePost",()=>{
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )
    test("verifica se o token é válido", async () => {
        try {
            const input: DeletePostInputDTO = {
                id:"id-mock-post",
                token: "id-post",
                
            }

         await postBusiness.deletePost(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: O token é inválido.")
                expect(error.statusCode).toBe(400)
            }
        }


    })

    test("verifica se o id é válido", async () => {
        try {
            const input: DeletePostInputDTO = {
                id:"id-mock",
                token: "token-mock-normal",
                
            }


         await postBusiness.deletePost(input)


        } catch (error) {
            if (error instanceof BadRequestError) {
                expect(error.message).toBe("ERRO: Id não encontrado.")
                expect(error.statusCode).toBe(404)
            }
        }


    })
    test("verifica se o post foi criado", async () => {


        const input: DeletePostInputDTO = {
            id:"id-mock-post",
            token: "token-mock-normal",
            
        }

      await postBusiness.deletePost(input)

    })
})
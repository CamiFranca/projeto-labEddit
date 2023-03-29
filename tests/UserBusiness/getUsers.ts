import { UserBusiness } from "../../src/business/UserBusiness"
import { USER_ROLES } from "../../src/types"
import { HashManagerMock } from "../Mocks/HashManagerMock"
import { IdGeneratorMock } from "../Mocks/IdGeneratorMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"
import { UserDatabaseMock } from "../Mocks/UserDatabaseMock"

describe("getUsers", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve retornar um usuário ou uma lista de Users", async () => {
        const response = await userBusiness.getUsers("Normal Mock")

        expect(response).toContainEqual({
            id: "id-mock",
            name: "Normal Mock",
            email: "normal@email.com",
            password: "hash-bananinha",
            role: USER_ROLES.NORMAL
        })
    })
})
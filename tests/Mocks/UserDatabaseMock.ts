import {BaseDatabase} from "../../src/database/BaseDatabase"
import {UserModelDB} from  "../../src/models/Users"
import { USER_ROLES } from "../../src/types"


export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    public signup = async (UserDB: UserModelDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public findEmail = async (email: string): Promise<UserModelDB | undefined>  => {
        switch (email) {
            case "normal@email.com":
                return {
                    id: "id-mock",
                    nick_name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-bananinha",
                    role: USER_ROLES.NORMAL
                }
            case "admin@email.com":
                return {
                    id: "id-mock",
                    nick_name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-bananinha",
                    role: USER_ROLES.ADMIN
                }
            default:
                return undefined
        }
    }

    public getUsers = async (q:string): Promise<UserModelDB[]>  => {

            if(q === "Normal Mock"){
                return [
                    {
                        id: "id-mock",
                        nick_name: "Normal Mock",
                        email: "normal@email.com",
                        password: "hash-bananinha",
                        role: USER_ROLES.NORMAL
                    }
                ]
            } else if (q === "Admin Mock"){

                return [
                {
                    id: "id-mock",
                    nick_name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-bananinha",
                    role: USER_ROLES.ADMIN
                }
            ]

            } else {
                
                return [
                    {
                        id: "id-mock",
                        nick_name: "Normal Mock",
                        email: "normal@email.com",
                        password: "hash-bananinha",
                        role: USER_ROLES.NORMAL
                    },
                    {
                        id: "id-mock",
                        nick_name: "Admin Mock",
                        email: "admin@email.com",
                        password: "hash-bananinha",
                        role: USER_ROLES.ADMIN
                    }
                ]
            }
            }


    public getAllUsersComments = async (): Promise<UserModelDB[]> => {
      
        return [
            {
                id: "id-mock",
                nick_name: "Normal Mock",
                email: "normal@email.com",
                password: "hash-bananinha",
                role: USER_ROLES.NORMAL
            },
            {
                id: "id-mock",
                nick_name: "Admin Mock",
                email: "admin@email.com",
                password: "hash-bananinha",
                role: USER_ROLES.ADMIN
            }
        ]
    }
}
import { UserModelDB } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async getUsers (q:string) : Promise<UserModelDB[]>{
        let userDB

        if(q){
            const saveUsers :UserModelDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where("nick_name","LIKE",`%${q}%`)
            userDB = saveUsers
        }else{
            const saveUsers :UserModelDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            userDB = saveUsers
        }

        return userDB
       
    }
    public async findEmail(email:string): Promise<UserModelDB|undefined>  {
        const emailExists : UserModelDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()
        .where({email})
        return emailExists[0]

    }

    public async signup(userDB: UserModelDB):Promise<void> {
        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(userDB)
    }

    public getAllUsersComments = async (): Promise<UserModelDB[]> => {
        const result: UserModelDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
        return result
    }
}
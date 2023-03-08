import { USER_ROLES } from "../types"



// export interface UserModelDB {
//     id: string,
//     name: string,
//     email: string,
//     password: string,
//     role: string

// }

export interface UserModel {
    id: string,
    nickName: string,
    email: string,
    password: string,
    role: string,
  
}

export class Users {
    constructor(
        private id: string,
        private nickName: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
       
    ) { }


    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }
    public getNickname(): string {
        return this.nickName
    }

    public setNickName(value: string): void {
        this.nickName = value

    }
    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value

    }
    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value

    }
    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(value: USER_ROLES): void {
        this.role = value

    }

    public toDBModel(): UserModel {
        return {
            id: this.id,
            nickName: this.nickName,
            email: this.email,
            password: this.password,
            role: this.role
      
        }
    }
}
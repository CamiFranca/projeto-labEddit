export enum USER_ROLES {
NORMAL = "NORMAL",
ADMIN = "ADMIN"
}

export interface TokenPayload {
    id:string,
    nickName:string,
    role:USER_ROLES
}

export interface DeletePost{
   token:string
}

export interface Like{
    token:string,
    like: string
}

 export interface Dislike{
    token:string,
    dislike: string
}

export interface SignupOutput{
    token:string
 }

 export interface LoginOutput{
    token:string
 } 
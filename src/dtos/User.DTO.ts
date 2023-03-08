import { BadRequestError } from "../errors/BadRequestError"

export interface SignupInputDTO { //input?
    nickName: string,
    email: string,
    password: string,
}

export interface SignupOutputDTO{ //output?
    token: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface LoginOutputDTO {
    token: string

}

export class UserDTO {

    public SignupDTO(
        nickName: unknown,
        email: unknown,
        password: unknown,
    ): SignupInputDTO {

        if (typeof nickName !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const dto: SignupInputDTO = {

            nickName,
            email,
            password

        }

        return dto
    }

    public loginUserDTO(
        email: unknown,
        password: unknown

    ): LoginInputDTO {

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const dto: LoginInputDTO = {
            email,
            password
        }

        return dto
    }

}

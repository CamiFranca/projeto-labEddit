import { UserBusiness } from "../business/UserBusiness"
import { UserDTO } from "../dtos/User.DTO"
import { BaseError } from "../errors/BaseError"
import { Request, Response } from "express"

export class UserController {
    constructor(
        private userBusiness: UserBusiness,
        private userDTO: UserDTO
    ) { }

    public getUsers = async (req:Request, res: Response) =>{

        try {
            
            const q = req.query.q as string

            const output = await this.userBusiness.getUsers(q)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }
    public signup = async (req: Request, res: Response) => {

        try {
            const input = this.userDTO.SignupDTO(
                req.body.nickName,
                req.body.email,
                req.body.password

            )

            const output = await this.userBusiness.signup(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }

        }
    }

    public login = async (req:Request, res:Response) => {

        try {
            const input = this.userDTO.loginUserDTO(
                req.body.email,
                req.body.password

            )
            const output = await this.userBusiness.login(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado.")
            }
        }
    }
}
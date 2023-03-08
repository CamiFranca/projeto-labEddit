import { UserDatabase } from "../database/UserDatabase"
import { LoginInputDTO, SignupInputDTO } from "../dtos/User.DTO";
import { BadRequestError } from "../errors/BadRequestError";
import { Users } from "../models/Users";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { SignupOutput, TokenPayload, USER_ROLES } from "../types";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public getUsers = async (q: string) => {

        const usersDB = await this.userDatabase.getUsers(q)

        const instaceUser = usersDB.map((userDB) => {
            const user = new Users(
                userDB.id,
                userDB.nick_name,
                userDB.email,
                userDB.password,
                userDB.role
            )
            return user.toBusinessModel()
        })

        return instaceUser
    }
    public signup = async (input: SignupInputDTO): Promise<SignupOutput> => {
        const {
            nickName,
            email,
            password
        } = input


        if (nickName.length < 2) {
            throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres")
        }

        if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
            throw new BadRequestError("ERROR: 'email' must be like 'example@example.example'.")
        }

        // if (!password.match(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^\da-zA-Z]).{8,12}$/g)) {
        //     throw new BadRequestError("ERROR: 'password' must be between 8 and 12 characters, with uppercase and lowercase letters and at least one number and one special character")
        // }

        const emailExist = await this.userDatabase.findEmail(email)

        if (emailExist) {
            throw new BadRequestError("Email já cadastrado.")
        }

        const idGenerator = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)
        const role = USER_ROLES.NORMAL

        const newUser = new Users(
            idGenerator,
            nickName,
            email,
            hashedPassword,
            role
        )

        const userDB = newUser.toDBModel()

        await this.userDatabase.signup(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            nickName: newUser.getNickname(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutput = {
            token: token
        }

        return output
    }

    public login = async (input: LoginInputDTO) => {

        const { email, password } = input

        if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
            throw new BadRequestError("ERRO: o email deve seguir esse exemplo: 'examplo@examplo.examplo'.")
        }

        if (password.length < 6) {
            throw new BadRequestError("ERRO: 'O passaword precisa ter pelo menos seis caracteres.'.")

        }

        //dá erro qdo eu tipo com a classe Users.
        const emailExist = await this.userDatabase.findEmail(email)

        if (!emailExist) {
            throw new BadRequestError("ERRO: O email não existe")
        }
        const passawordDB = emailExist.password
        const idDB = emailExist.id
        const nickNameDB = emailExist.nick_name
        const roleDB = emailExist.role
        console.log(emailExist)

        const isPasswordCorrect = await this.hashManager.compare(password, passawordDB)

        if (!isPasswordCorrect) {
            throw new BadRequestError("ERRO: A senha está incorreta")
        }

        const payload: TokenPayload = {
            id: idDB,
            nickName: nickNameDB,
            role: roleDB
        }

        const token = this.tokenManager.createToken(payload)

        const output = {
            token: token
        }

        return output
    }
}
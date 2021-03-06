import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserController {
    private userBusiness: UserBusiness

    constructor() {
        this.userBusiness = new UserBusiness(
            new UserDatabase(),
            new IdGenerator(),
            new HashManager(),
            new Authenticator()
        )
    }
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role.toUpperCase()
            }

            const token = await this.userBusiness.createUser(input);

            res.status(200).send({ token });

        } catch (error: any) {
            res.status(error.code || 500).send({ error: error.message } || { error: "Internal Server Error" });
        }
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const token = await this.userBusiness.login(loginData);

            res.status(200).send({ token });

        } catch (error: any) {
            res.status(error.code || 500).send({ error: error.message } || { error: "Internal Server Error" });
        }

    }

}
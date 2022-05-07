import { UserInputDTO, LoginInputDTO, USER_ROLES } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UserRepository } from "./UserRepository";
import { InvalidInputError } from "../error/InvalidInputError";

export class UserBusiness {

    constructor(
        private userDatabase: UserRepository,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {
    }
    async createUser(user: UserInputDTO) {
        if (!user.email || !user.name || !user.password || !user.role) {
            throw new InvalidInputError("All fields must be filled")
        }

        if (user.role !== USER_ROLES.ADMIN && user.role !== USER_ROLES.NORMAL) {
            throw new InvalidInputError("role must be 'ADMIN' or 'NORMAL'")
        }

        if (!user.email.includes("@")) {
            throw new InvalidInputError("Invalid email format")
        }

        if (user.password.length < 6) {
            throw new InvalidInputError("The password must be equal to or greater than 6 digits")
        }

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        if (userFromDB) {
            throw new Error(`User already exists with email ${user.email}`)
        }

        const id = this.idGenerator.generateId();

        const hashPassword = this.hashManager.createHash(user.password);

        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = this.authenticator.generateToken({ id: id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        if (!user.email || !user.password) {
            throw new InvalidInputError("All fields must be filled")
        }

        if (!user.email.includes("@")) {
            throw new InvalidInputError("Invalid email format")
        }

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new Error(`User already exists with email ${user.email}`)
        }

        const hashCompare = this.hashManager.compareHash(user.password, userFromDB.getPassword());

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}
import { InvalidInputError } from "../error/InvalidInputError";

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRole() {
        return this.role;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setRole(role: USER_ROLES) {
        this.role = role;
    }

    static stringToUserRole(input: string): USER_ROLES {
        switch (input) {
            case "NORMAL":
                return USER_ROLES.NORMAL;
            case "ADMIN":
                return USER_ROLES.ADMIN;
            default:
                throw new InvalidInputError("Invalid user role");
        }
    }

    static toUserModel(user: any): User {
        return new User(user.id, user.name, user.email, user.password, User.stringToUserRole(user.role));
    }


}

export interface UserInputDTO {
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface LoginInputDTO {
    email: string;
    password: string;
}

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}
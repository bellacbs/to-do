import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { USER_ROLES } from "../entities/User";

export interface AuthenticationData {
    id: string
    role: USER_ROLES
};

export class Authenticator {
    generateToken = (payload: AuthenticationData) => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string, 
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
            }
        );
        return token
    };

    getTokenData = (token: string): AuthenticationData => {
        const data = jwt.verify(token, String(process.env.JWT_KEY))
        return data as AuthenticationData
    };

};
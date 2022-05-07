import { BaseError } from "./BaseError";

export class InvalidAuthenticatorError extends BaseError {
    constructor(message: string) {
        super(message, 401)
    }
}
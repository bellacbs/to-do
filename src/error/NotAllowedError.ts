import { BaseError } from "./BaseError";

export class NotAllowedError extends BaseError {
    constructor(message: string) {
        super(message, 405)
    }
}
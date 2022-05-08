import { BaseError } from "./BaseError";

export class NotFoundElementError extends BaseError {
    constructor(message: string) {
        super(message, 404)
    }
}
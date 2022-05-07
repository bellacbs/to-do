import { compareSync, genSaltSync, hashSync } from "bcryptjs"


export class HashManager {
    createHash(text: string): string {

        const rounds: number = Number(process.env.BCRYPT_COST)

        const salt: string = genSaltSync(rounds)

        const cypherText: string = hashSync(text, salt)

        return cypherText
    }

    compareHash = (text: string, cypherText: string): boolean => {
        return compareSync(text, cypherText)
    }
};
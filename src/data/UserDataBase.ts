import BaseDataBase from "./BaseDataBase";
import { User } from "../model/User";
import { UserRepository } from "../business/UserRepository";

export class UserDatabase extends BaseDataBase implements UserRepository {

    public async createUser(
        id: string,
        email: string,
        name: string,
        password: string,
        role: string
    ): Promise<void> {

        await BaseDataBase.connection
            .insert({
                id,
                email,
                name,
                password,
                role
            })
            .into(BaseDataBase.tableNames.toDoUsers);

    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const result = await BaseDataBase.connection
            .select("*")
            .from(BaseDataBase.tableNames.toDoUsers)
            .where({ email });

        if (result.length === 0) {
            return null
        }
        return User.toUserModel(result[0]);
    }

    public async getUserById(id: string): Promise<User | null> {
        const result = await BaseDataBase.connection
            .select("*")
            .from(BaseDataBase.tableNames.toDoUsers)
            .where({ id });

        if (result.length === 0) {
            return null
        }
        return User.toUserModel(result[0]);
    }

}

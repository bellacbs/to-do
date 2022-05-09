import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

export default class BaseDataBase {

    protected static tableNames = {
        toDoUsers: "to_do_users",
        toDoTasks: "to_do_tasks"
    }

    protected static connection: Knex = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_SCHEMA,
            multipleStatements: true
        },
    });
    
};
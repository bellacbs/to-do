import { BaseDatabase } from "./BaseDatabase"

export class Migrations extends BaseDatabase {
    static createTables = () => BaseDatabase.connection
    .raw(
        `
        CREATE TABLE IF NOT EXISTS to_do_user (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS to_do_task(
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            limite_date DATE NOT NULL,
            creator_user_id VARCHAR(255) NOT NULL,
            FOREIGN KEY(creator_user_id) REFERENCES to_do_user(id)
        );
        `
    )
    .then(() => console.log("Tabelas criadas"))
    .catch((error: any) => console.log(error.message || error.sqlMessage))
    

    static closeConnection = () => this.connection.destroy();
};

Migrations.createTables().then(Migrations.closeConnection)
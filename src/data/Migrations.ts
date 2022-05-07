import BaseDataBase from "./BaseDataBase";

export class Migrations extends BaseDataBase {
    static createTables = () => BaseDataBase.connection
    .raw(
        `
        CREATE TABLE IF NOT EXISTS to_do_users (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS to_do_tasks(
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            created_time DATETIME NOT NULL,
            limit_date DATE NOT NULL,
            edited_time DATETIME,
            status ENUM('TODO','DOING','DONE') DEFAULT 'TODO',
            creator_user_id VARCHAR(255) NOT NULL,
            FOREIGN KEY(creator_user_id) REFERENCES to_do_users(id)
        );
        `
    )
    .then(() => console.log("Created tables"))
    .catch((error: any) => console.log(error.message || error.sqlMessage))
    

    static closeConnection = () => this.connection.destroy();
};

Migrations.createTables().then(Migrations.closeConnection)
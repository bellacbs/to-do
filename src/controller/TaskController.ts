import { TaskBusiness } from "../business/TaskBusiness";
import { TaskDataBase } from "../data/TaskDataBase";
import { UserDatabase } from "../data/UserDataBase";
import { TaskInputDTO } from "../model/Task";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { Request, Response } from "express";

export class TaskController {
    private taskBusiness: TaskBusiness

    constructor() {
        this.taskBusiness = new TaskBusiness(
            new TaskDataBase(),
            new UserDatabase(),
            new IdGenerator(),
            new Authenticator()
        )
    }

    async createdTask(req: Request, res: Response) {
        try {
            const inputTask: TaskInputDTO = {
                title: req.body.title,
                description: req.body.description,
                limitDate: req.body.limitDate
            }

            await this.taskBusiness.createTask(req.headers.authorization as string, inputTask)

            res.status(200).send("task created successfully");

        }
        catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }
}
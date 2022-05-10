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

            const token = req.headers.authorization as string

            await this.taskBusiness.createTask(token, inputTask)

            res.status(200).send("task created successfully");

        }
        catch (error: any) {
            res.status(error.code || 500).send({ error: error.message } || { error: "Internal Server Error" });
        }
    }

    async putTaskAsDone(req: Request, res: Response) {
        try {
            const taskId = req.params.taskId as string
            const token = req.headers.authorization as string

            await this.taskBusiness.putTaskAsDone(token, taskId)

            res.status(200).send("task completed successfully")

        } catch (error: any) {
            res.status(error.code || 500).send({ error: error.message } || { error: "Internal Server Error" });
        }
    }

    async editTask(req: Request, res: Response) {
        try {
            const inputTask: TaskInputDTO = {
                title: req.body.title,
                description: req.body.description,
                limitDate: req.body.limitDate
            }

            const taskId = req.params.taskId as string
            const token = req.headers.authorization as string

            await this.taskBusiness.editTask(token, inputTask, taskId)

            res.status(200).send("task edited successfully")

        } catch (error: any) {
            res.status(error.code || 500).send({ error: error.message } || { error: "Internal Server Error" });
        }
    }

    async getUserTasks(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const tasks = await this.taskBusiness.getUserTasks(token)

            res.status(200).send({ tasks: tasks })

        } catch (error: any) {
            res.status(error.code || 500).send({ error: error.message } || { error: "Internal Server Error" });
        }
    }

    async getAllUsersTasks(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const page = Number(req.query.page as string) | 1
            const limit = Number(req.query.limit as string) | 10

            const tasks = await this.taskBusiness.getAllUsersTasks(token, page, limit)

            res.status(200).send({ tasks: tasks })

        } catch (error: any) {
            res.status(error.code || 500).send({ error: error.message } || { error: "Internal Server Error" });
        }
    }

    async getLateTasks(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const page = Number(req.query.page as string) | 1
            const limit = Number(req.query.limit as string) | 10

            const tasks = await this.taskBusiness.getLateTasks(token, page, limit)

            res.status(200).send({ tasks: tasks })

        } catch (error: any) {
            res.status(error.code || 500).send({ error: error.message } || { error: "Internal Server Error" });
        }
    }
}
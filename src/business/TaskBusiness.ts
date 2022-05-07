import { UserDatabase } from "../data/UserDataBase";
import { InvalidAuthenticatorError } from "../error/InvalidAuthenticatorError";
import { InvalidInputError } from "../error/InvalidInputError";
import { Task, TaskInputDTO, TASK_STATUS } from "../model/Task";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TaskRepository } from "./TaskRepository";
import { UserRepository } from "./UserRepository";

export class TaskBusiness{
    constructor(
        private taskDataBase: TaskRepository,
        private userDataBase: UserRepository,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ){}

    async createTask(token: string, task: TaskInputDTO){
        if(!token){
            throw new InvalidInputError("All fields must be filled")
        }
        if(!task.title || !task.description || !task.limitDate){
            throw new InvalidInputError("All fields must be filled")
        }

        if(typeof task.title !== "string" || typeof task.description !== "string"){
            throw new InvalidInputError("title and description must be of type string")
        }

        const userByToken = this.authenticator.getTokenData(token)

        const user = await this.userDataBase.getUserById(userByToken.id)

        if(!user){
            throw new InvalidAuthenticatorError("Unauthorized user or does not exist")
        }

        const createdTime = new Date()

        const limiteDate = new Date(task.limitDate)

        const taskId = this.idGenerator.generateId()

        const newTask = new Task(taskId, task.title, task.description, createdTime,limiteDate,null, TASK_STATUS.TODO, userByToken.id)

        await this.taskDataBase.createTask(newTask)
    }
}
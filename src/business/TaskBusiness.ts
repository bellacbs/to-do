import { InvalidAuthenticatorError } from "../error/InvalidAuthenticatorError";
import { InvalidInputError } from "../error/InvalidInputError";
import { NotAllowedError } from "../error/NotAllowedError";
import { NotFoundElementError } from "../error/NotFoundElementError";
import { Task, TaskInputDTO, TASK_STATUS } from "../model/Task";
import { USER_ROLES } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { convertDate } from "../utils/convertDate";
import { isValidDate } from "../utils/isValidDate";
import { TaskRepository } from "./TaskRepository";
import { UserRepository } from "./UserRepository";

export class TaskBusiness {
    constructor(
        private taskDataBase: TaskRepository,
        private userDataBase: UserRepository,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createTask(token: string, task: TaskInputDTO) {
        if (!token) {
            throw new InvalidInputError("All fields must be filled")
        }
        if (!task.title || !task.description || !task.limitDate) {
            throw new InvalidInputError("All fields must be filled")
        }

        if (typeof task.title !== "string" || typeof task.description !== "string") {
            throw new InvalidInputError("title and description must be of type string")
        }

        const userByToken = this.authenticator.getTokenData(token)

        const user = await this.userDataBase.getUserById(userByToken.id)

        if (!user) {
            throw new InvalidAuthenticatorError("Unauthorized user or does not exist")
        }

        if (!isValidDate(task.limitDate)) {
            throw new InvalidInputError("limitDate must be of the format dd/mm/yyyy, dd-mm-yyyy or dd.mm.yyyy")
        }

        const createdTime = new Date()

        const newLimiteDate = convertDate(task.limitDate)

        const limiteDate = new Date(newLimiteDate)

        if (limiteDate.getTime() < createdTime.getTime()) {
            throw new InvalidInputError("limitDate must be greater than the current date")
        }

        const taskId = this.idGenerator.generateId()

        const newTask = new Task(taskId, task.title, task.description, createdTime, limiteDate, null, null, TASK_STATUS.TODO, userByToken.id)

        await this.taskDataBase.createTask(newTask)
    }

    async putTaskAsDone(token: string, taskId: string) {
        if (!token) {
            throw new InvalidInputError("'token' missing")
        }
        if (!taskId) {
            throw new InvalidInputError("'taskId' missing")
        }

        if (typeof taskId !== "string") {
            throw new InvalidInputError("taskId must be of type string")
        }

        const userByToken = this.authenticator.getTokenData(token)

        const user = await this.userDataBase.getUserById(userByToken.id)

        if (!user) {
            throw new InvalidAuthenticatorError("Unauthorized user or does not exist")
        }

        const userTask = await this.taskDataBase.getTaskAndUserById(taskId, userByToken.id)

        if (!userTask) {
            throw new NotFoundElementError("task not found")
        }

        await this.taskDataBase.updateStatusToDone(taskId, new Date())

    }

    async editTask(token: string, task: TaskInputDTO, taskId: string) {
        if (!token) {
            throw new InvalidInputError("'token' missing")
        }
        if (!task.title || !task.description || !task.limitDate) {
            throw new InvalidInputError("All fields must be filled")
        }

        if (typeof task.title !== "string" || typeof task.description !== "string") {
            throw new InvalidInputError("title and description must be of type string")
        }

        if (!isValidDate(task.limitDate)) {
            throw new InvalidInputError("limitDate must be of the format dd/mm/yyyy, dd-mm-yyyy or dd.mm.yyyy")
        }

        const limiteDate = convertDate(task.limitDate)

        if (new Date(limiteDate).getTime() < new Date().getTime()) {
            throw new InvalidInputError("limitDate must be greater than the current date")
        }

        const userByToken = this.authenticator.getTokenData(token)

        const user = await this.userDataBase.getUserById(userByToken.id)

        if (!user) {
            throw new InvalidAuthenticatorError("Unauthorized user or does not exist")
        }

        const userTask = await this.taskDataBase.getTaskAndUserById(taskId, userByToken.id)

        if (!userTask) {
            throw new NotFoundElementError("task not found")
        }

        if (userTask.getStatus() === TASK_STATUS.DONE) {
            throw new NotAllowedError("Not allowed, task already completed")
        }

        const newTask: TaskInputDTO = {
            title: task.title,
            description: task.description,
            limitDate: limiteDate,

        }

        await this.taskDataBase.updateTask(taskId, newTask)

    }

    async getUserTasks(token: string) {
        if (!token) {
            throw new InvalidInputError("'token' missing")
        }

        const userByToken = this.authenticator.getTokenData(token)

        const user = await this.userDataBase.getUserById(userByToken.id)

        if (!user) {
            throw new InvalidAuthenticatorError("Unauthorized user or does not exist")
        }

        const userTask = await this.taskDataBase.getTaskByUserId(userByToken.id)

        if (!userTask) {
            throw new NotFoundElementError("task not found")
        }


        return userTask.map((task) => {
            return {
                id: task.getId(),
                title: task.getTitle(),
                description: task.getDescription(),
                created_time: task.getCreatedTime(),
                limit_date: task.getLimitDate(),
                edited_time: task.getEditedTime(),
                status: task.getStatus(),
                isLate: task.getLimitDate().getTime() < (new Date()).getTime()
            }
        })

    }

    async getAllUsersTasks(token: string, page: number, limit: number) {

        if (!token) {
            throw new InvalidInputError("'token' missing")
        }

        if (page <= 0) {
            throw new InvalidAuthenticatorError("page must be greater than 0")
        }

        const userByToken = this.authenticator.getTokenData(token)

        const user = await this.userDataBase.getUserById(userByToken.id)

        if (!user) {
            throw new InvalidAuthenticatorError("Unauthorized user or does not exist")
        }

        if (userByToken.role !== USER_ROLES.ADMIN) {
            throw new InvalidAuthenticatorError("Functionality can only be accessed by administrators")
        }

        const offset = limit * (page - 1)

        const usersTask = await this.taskDataBase.getAllUsersTasks(offset, limit)

        return usersTask

    }

    async getLateTasks(token: string, page: number, limit: number) {

        if (!token) {
            throw new InvalidInputError("'token' missing")
        }

        if (page <= 0) {
            throw new InvalidAuthenticatorError("page must be greater than 0")
        }

        const userByToken = this.authenticator.getTokenData(token)

        const user = await this.userDataBase.getUserById(userByToken.id)

        if (!user) {
            throw new InvalidAuthenticatorError("Unauthorized user or does not exist")
        }

        if (userByToken.role !== USER_ROLES.ADMIN) {
            throw new InvalidAuthenticatorError("Functionality can only be accessed by administrators")
        }

        const offset = limit * (page - 1)

        const usersTask = await this.taskDataBase.getLateTasks(offset, limit)

        return usersTask

    }
}
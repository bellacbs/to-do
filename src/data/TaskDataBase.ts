import { TaskRepository } from "../business/TaskRepository";
import { Task, TaskInputDTO, TASK_STATUS } from "../model/Task";
import BaseDataBase from "./BaseDataBase";

export class TaskDataBase extends BaseDataBase implements TaskRepository {
    async createTask(task: Task): Promise<void> {
        await BaseDataBase.connection
            .insert({
                id: task.getId(),
                title: task.getTitle(),
                description: task.getDescription(),
                created_time: task.getCreatedTime(),
                limit_date: task.getLimitDate(),
                edited_time: task.getEditedTime(),
                status: task.getStatus(),
                creator_user_id: task.getCreatorUserId()
            })
            .into(BaseDataBase.tableNames.toDoTasks)
    }

    async getTaskAndUserById(taskId: string, userId: string): Promise<Task | null> {

        const result = await BaseDataBase.connection
            .select("*")
            .from(BaseDataBase.tableNames.toDoTasks)
            .where({ id: taskId })
            .andWhere({ creator_user_id: userId })

        if (result.length === 0) {
            return null
        }

        return Task.toTaskModel(result[0])
    }

    async updateStatusToDone(taskId: string, finishedTime: Date): Promise<void> {
        await BaseDataBase.connection(BaseDataBase.tableNames.toDoTasks)
            .where({ id: taskId })
            .update({
                finished_time: finishedTime,
                status: TASK_STATUS.DONE
            })
    }

    async updateTask(taskId: string, task: TaskInputDTO): Promise<void> {
        await BaseDataBase.connection(BaseDataBase.tableNames.toDoTasks)
            .where({ id: taskId })
            .update({
                title: task.title,
                description: task.description,
                limit_date: task.limitDate,
                edited_time: new Date()
            })
    }

    async getTaskByUserId(userId: string): Promise<Task[] | null> {
        const result = await BaseDataBase.connection
            .select("*")
            .from(BaseDataBase.tableNames.toDoTasks)
            .where({ creator_user_id: userId })

        if (result.length === 0) {
            return null
        }

        return result.map((task) => {
            return Task.toTaskModel(task)
        })
    }

    async getAllUsersTasks(offset: number, limit: number): Promise<any | null> {
        const result = await BaseDataBase.connection
            .select(`${BaseDataBase.tableNames.toDoTasks}.id as taskId`, "title", "description", "limit_date as limitDate", "email")
            .from(BaseDataBase.tableNames.toDoTasks)
            .join(BaseDataBase.tableNames.toDoUsers, { 'creator_user_id': `${BaseDataBase.tableNames.toDoUsers}.id` })
            .limit(limit)
            .offset(offset)

        if (result.length === 0) {
            return null
        }

        return result
    }

    async getLateTasks(offset: number, limit: number): Promise<any | null> {

        const result = await BaseDataBase.connection.raw(`
        SELECT task.id as taskId, title, description, limit_date as limitDate, email
        FROM ${BaseDataBase.tableNames.toDoTasks} as task
        JOIN ${BaseDataBase.tableNames.toDoUsers} as user
        WHERE limit_date < CURDATE()
        LIMIT ${limit}
        OFFSET ${offset}
        `)

        if (result.length[0] === 0) {
            return null
        }

        return result[0][0]
    }
}
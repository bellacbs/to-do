import { TaskRepository } from "../business/TaskRepository";
import { Task, TaskInputDTO, TASK_STATUS } from "../model/Task";
import BaseDataBase from "./BaseDataBase";

export class TaskDataBase extends BaseDataBase implements TaskRepository {
    async createTask(task: Task): Promise<void> {
        try {
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
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getTaskAndUserById(taskId: string, userId: string): Promise<Task | null> {
        
        const result = await BaseDataBase.connection
            .select("*")
            .from(BaseDataBase.tableNames.toDoTasks)
            .where({id: taskId})
            .andWhere({creator_user_id: userId})

        if (result.length === 0) {
            return null
        }

        return Task.toTaskModel(result[0])
    }

    async updateStatusToDone(taskId: string, finishedTime: Date): Promise<void> {
        await BaseDataBase.connection(BaseDataBase.tableNames.toDoTasks)
        .where({id: taskId})
        .update({
            finished_time: finishedTime,
            status: TASK_STATUS.DONE
        })
    }

    async updateTask(taskId: string, task: TaskInputDTO): Promise<void>{
        await BaseDataBase.connection(BaseDataBase.tableNames.toDoTasks)
        .where({id: taskId})
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
            .where({creator_user_id: userId})

        if (result.length === 0) {
            return null
        }

        return result.map((task) => {
            return Task.toTaskModel(task)
        })
    }


}
import { Task, TaskInputDTO } from "../model/Task";

export interface TaskRepository{
    createTask(task: Task):Promise<void>
    getTaskAndUserById(taskId: string, userId: string): Promise<Task | null>
    updateStatusToDone(taskId: string, finishedTime: Date): Promise<void>
    updateTask(taskId: string, task: TaskInputDTO): Promise<void>
    getTaskByUserId(userId: string): Promise<Task[] | null>
}
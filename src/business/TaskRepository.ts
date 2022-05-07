import { Task } from "../model/Task";

export interface TaskRepository{
    createTask(task: Task):Promise<void>
}
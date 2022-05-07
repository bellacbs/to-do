import { TaskRepository } from "../business/TaskRepository";
import { Task } from "../model/Task";
import BaseDataBase from "./BaseDataBase";

export class TaskDataBase extends BaseDataBase implements TaskRepository{
    async createTask(task: Task):Promise<void>{
        console.log(task.getCreatorUserId())
        try{
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
        }catch(error: any){
            throw new Error(error.sqlMessage || error.message);
        }
    }


}
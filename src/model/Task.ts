export class Task{
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private createdTime: Date,
        private limitDate: Date,
        private editedTime: Date,

    ){}

    getId(){
        return this.id
    }
    getTitle(){
        return this.title
    }
    getDescription(){
        return this.description
    }
    getCreatedTime(){
        return this.createdTime
    }
    getLimitDate(){
        return this.limitDate
    }
    getEditedTime(){
        return this.editedTime
    }

    setId(id: string){
        this.id = id
    }

    setTitle(title: string){
        this.title = title
    }

    setDescription(description: string){
        this.description = description
    }
    setCreatedTime(createdTime: Date){
        this.createdTime = createdTime
    }

    setLimitDate(limitDate: Date){
        this.limitDate = limitDate
    }

    setEditedTime(editedTime: Date){
        this.editedTime = editedTime
    }

    static toTaskModel(task: any): Task{
        return new Task(
            task.id,
            task.title,
            task.description,
            task.createdTime || task.created_time,
            task.limitDate || task.limit_date,
            task.editedTime || task.edited_time
        )
    }
}

export interface TaskInputDTO{
    title: string,
    description: string,
    limitDate: string,
}
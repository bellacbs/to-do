export class Task {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private createdTime: Date,
        private limitDate: Date,
        private editedTime: Date | null,
        private finishedTime: Date | null,
        private status: TASK_STATUS,
        private creatorUserId: string

    ) { }

    getId() {
        return this.id
    }
    getTitle() {
        return this.title
    }
    getDescription() {
        return this.description
    }
    getCreatedTime() {
        return this.createdTime
    }
    getLimitDate() {
        return this.limitDate
    }
    getEditedTime() {
        return this.editedTime
    }
    getFinishedTime() {
        return this.finishedTime
    }

    getStatus() {
        return this.status
    }

    getCreatorUserId() {
        return this.creatorUserId
    }

    setId(id: string) {
        this.id = id
    }

    setTitle(title: string) {
        this.title = title
    }

    setDescription(description: string) {
        this.description = description
    }
    setCreatedTime(createdTime: Date) {
        this.createdTime = createdTime
    }

    setLimitDate(limitDate: Date) {
        this.limitDate = limitDate
    }

    setEditedTime(editedTime: Date) {
        this.editedTime = editedTime
    }

    setFinishedTime(finishedTime: Date | null) {
        this.finishedTime = finishedTime
    }

    setStatus(status: TASK_STATUS) {
        this.status = status
    }

    setCreatorUserId(creatorUserId: string) {
        this.creatorUserId = creatorUserId
    }

    static toTaskModel(task: any): Task {
        return new Task(
            task.id,
            task.title,
            task.description,
            task.createdTime || task.created_time,
            task.limitDate || task.limit_date,
            task.editedTime || task.edited_time,
            task.finishedTime || task.finished_time,
            task.status,
            task.creatorUserId || task.creator_user_id
        )
    }
}

export interface TaskInputDTO {
    title: string,
    description: string,
    limitDate: string,
}

export enum TASK_STATUS {
    TODO = "TODO",
    DOING = "DOING",
    DONE = "DONE"
}
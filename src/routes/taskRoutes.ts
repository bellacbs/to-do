import express from 'express'
import { TaskController } from '../controller/TaskController'

export const taskRouter = express.Router()

const taskController = new TaskController()

taskRouter.get("/userTasks", (request, response) => taskController.getUserTasks(request, response))
taskRouter.get("/allUsersTasks", (request, response) => taskController.getAllUsersTasks(request, response))
taskRouter.post("/create", (request, response) => taskController.createdTask(request, response))
taskRouter.put("/done/:taskId", (request, response) => taskController.putTaskAsDone(request, response))
taskRouter.put("/edit/:taskId", (request, response) => taskController.editTask(request, response))
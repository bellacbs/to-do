import express from 'express'
import { TaskController } from '../controller/TaskController'

export const taskRouter = express.Router()

const taskController = new TaskController()

taskRouter.post("/create", (request, response) => taskController.createdTask(request, response))
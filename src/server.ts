import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { userRouter } from "./routes/userRoutes";
import { taskRouter } from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

app.use("/user", userRouter);
app.use("/task", taskRouter)


module.exports = app
import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { userRouter } from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

app.use("/user", userRouter);


module.exports = app
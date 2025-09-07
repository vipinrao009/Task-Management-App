import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import userRouter from './Routes/userRoute.js'
import taskRouter from './Routes/taskRoute.js'
import {ErrorMiddleware} from './middleware/Error.js';
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend live on Render 🚀" });
});

app.use('/api/v1/user',userRouter)
app.use('/api/v1/task',taskRouter)

app.use(ErrorMiddleware);

export default app;
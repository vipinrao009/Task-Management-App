import express from 'express'
import userRouter from './Routes/userRoute.js'
import taskRouter from './Routes/taskRoute.js'
import {ErrorMiddleware} from './middleware/Error.js';
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user',userRouter)
app.use('/api/v1/task',taskRouter)

app.use(ErrorMiddleware);

export default app;
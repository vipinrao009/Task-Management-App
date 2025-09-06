import express from 'express'
import userRouter from './Routes/userRoute.js'
import ErrorMiddleware from './middleware/Error.js';

const app = express();

app.use(express.json());

app.use('/api/v1/user',userRouter)

app.use(ErrorMiddleware);

export default app;
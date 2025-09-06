import express from 'express'
import userRouter from './Routes/userRoute.js'
const app = express();

app.use('/api/v1/user',userRouter)

export default app;
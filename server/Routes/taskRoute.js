import express from "express";
import { createTask, deleteTask, editTask, fetchTask } from "../Controller/taskController.js";
import { isLogin } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/create-task',isLogin,createTask)
router.get('/fetch-task',isLogin,fetchTask)
router.put('/edit-task/:id',isLogin,editTask)
router.delete('/delete-task/:id',deleteTask)

export default router

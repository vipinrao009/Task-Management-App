import express from "express";
import { createTask, deleteTask, editTask, fetchTask } from "../Controller/taskController.js";

const router = express.Router()

router.post('/create-task',createTask)
router.get('/fetch-task',fetchTask)
router.post('/edit-task',editTask)
router.delete('/delete-task',deleteTask)

export default router

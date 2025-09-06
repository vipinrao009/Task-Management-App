import express from "express";
import {  login, logout, signup } from "../Controller/userController.js";

const router = express.Router()

router.post('/signup', signup)
router.get('/login', login)
router.get('/logout', logout)

export default router

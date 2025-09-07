import asynceHandler from '../middleware/AsynceHandler.js'
import ErrorHandler from '../middleware/Error.js'
import Task from '../models/Task.js'

export const createTask = asynceHandler(async (req, res, next)=>{
    const {title, description} = req.body

    if(!title){
        return next(new ErrorHandler("Title is required", 400))
    }

    if(!description){
        return next(new ErrorHandler("Description is required", 400))
    }

    const task = await Task.create({
        title,
        description
    })

    res.status(200).json({
        success:true,
        message:"Task is created successfully...",
        task
    })
}) 
export const fetchTask = asynceHandler(async (req, res, next)=>{
    const tasks = await Task.find();
    res.status(200).json({
        success:true,
        message:'Fetched task successfully',
        tasks
    })
}) 

export const editTask = asynceHandler(async (req, res, next)=>{
    
}) 

export const deleteTask = asynceHandler(async (req, res, next)=>{
    
})
import asynceHandler from "../middleware/AsynceHandler.js";
import ErrorHandler from "../middleware/Error.js";
import Task from "../models/Task.js";

export const createTask = asynceHandler(async (req, res, next) => {
  const { title, description, status } = req.body;

  if (!title) {
    return next(new ErrorHandler("Title is required", 400));
  }

  if (!description) {
    return next(new ErrorHandler("Description is required", 400));
  }

  const task = await Task.create({
    title,
    description,
    status,
    user: req.user?._id,
  });

  res.status(200).json({
    success: true,
    message: "Task is created successfully...",
    task,
  });
});
export const fetchTask = asynceHandler(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user?._id }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    message: "Fetched task successfully",
    tasks,
  });
});

export const fetchSingleTask = asynceHandler(async(req,res,next)=>{
  const {id} = req.params;

  const task = await Task.findById(id)
  if(!task){
    return next(new ErrorHandler("Task not found",404))
  }

  res.status(200).json({
    success:true,
    message:"Fetched task successfully...",
    task
  })
})

export const editTask = asynceHandler(async (req, res, next) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  const task = await Task.findOne({ _id: id, user: req.user?._id });
  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }
  if (title) task.title = title;
  if (description) task.description = description;
  if (title) task.status = status;

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task,
  });
});

export const deleteTask = asynceHandler(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

const Task = require('../models/task')
const ErrorHandler = require('../utils/ErrorHandler')

//add a new task
const addTask = async(req,res)=>{
    try{
        const {title , description} = req.body;

     await Task.create({
        title,
        description,
        User : req.user
    })
    res.status(200).json({
        success : true,
        message : "Task added successfully"
    })
}catch(error){
    next(error);
}   
}

//show all task
const showTasks = async(req,res)=>{
   try{ const id = req.user._id;
    const task = await Task.find({User : id});
    res.json({
        success : true,
        task
    })
}catch(error){
    next(error);
}
}

//update task
const updateTask = async(req,res,next)=>{
   try{ const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler("Task does not exist",400));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success : true,
        message : "Task has been updated"
    })
}catch(error){
    next(error);
}
}

//Delete Task
const deleteTask = async(req,res,next)=>{
   try{ const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler("task doesn't exit.",400));

    await Task.deleteOne(task);

    res.status(200).json({
        success : true,
        message : "Task has been deleted"
    })
}catch(error){
    next(error);
}
}

module.exports = {
    addTask,
    showTasks,
    updateTask,
    deleteTask
};
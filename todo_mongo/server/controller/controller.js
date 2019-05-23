import mongoose from 'mongoose';
import model from '../model/model';

export function createTask(req, res){
    let date = new Date();
    let time = date.getTime();
    let completionDate = new Date(req.body.completionDate)
    completionDate = completionDate.getTime()
    const todoTask = new model({
        _id: mongoose.Types.ObjectId(),
        taskTitle: req.body.taskTitle,
        createdDate: time,
        completionDate: completionDate || 0,
        taskStatus: false
    });
    return todoTask
    .save()
    .then((newTask) => {
        return res.status(201).json({
            success: true,
            message: 'New Task Created',
            todoTask: newTask,
        });
    })
    .catch((error) => {
        return res.status(500).json({
            success: false,
            message: 'Server error, Please try again',
            error: error
        });
    })
}

export function getUnDoneTasks(req, res){
    model.find({taskStatus: false})
    .select('_id taskTitle createdDate completionDate')
    .then((allTasks) => {
        return res.status(200).json({
            success: true,
            message: 'All the Undone Tasks',
            allTodo: allTasks
        });
    })
    .catch((error) => {
        return res.status(500).json({
            success: false,
            message: 'Server error, Please try again',
            error: error
        });
    })
}

export function getDoneTasks(req, res){
    model.find({taskStatus: true})
    .select('_id taskTitle createdDate completionDate')
    .then((allTasks) => {
        return res.status(200).json({
            success: true,
            message: 'All the Completed Tasks',
            allTodo: allTasks
        });
    })
    .catch((error) => {
        return res.status(500).json({
            success: false,
            message: 'Server error, Please try again',
            error: error
        });
    }) 
}

export function completeTask(req, res){
    const _id = req.body.taskId;
    model.update({_id}, {$set: {taskStatus: true}})
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Task Done',
            _id
        })
    })
    .catch((error) => {
            res.status(500).json({
            success: false,
            message: 'Server error, Please try again',
            error: error
        });
    }) 
}

export function deleteTask(req, res){
    const _id = req.body.taskId;
    model.findByIdAndRemove(_id)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Task Deleted',
            _id
        })
    })
    .catch((error) => {
            res.status(500).json({
            success: false,
            message: 'Server error, Please try again',
            error: error
        });
    })
}
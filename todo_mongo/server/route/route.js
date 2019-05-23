import express from 'express';
import { createTask, getUnDoneTasks, getDoneTasks, completeTask, deleteTask } from '../controller/controller';

const router = express.Router();

router.post('/insertTodo', createTask);
router.get('/getUndoneTasks', getUnDoneTasks);
router.get('/getDoneTasks', getDoneTasks);
router.post('/completeTask', completeTask);
router.post('/deleteTask', deleteTask);

export default router;
import { Request, Response } from "express";
import { Task } from "../models/task.model";
import { error } from "console";

async function addTask(req: Request, res: Response): Promise<any> {
    const { title, content } = req.body
    const { user } = req as Request & { user: any }

    if (!title) {
        return res.status(400).send({ error: true, message: 'Title is required' });
    }
    if (!content) {
        return res.status(400).send({ error: true, message: 'Content is required' });
    }

    try {
        const task = await Task.create({
            title,
            content,
            isCompleted: false,
            userId: user.user._id
        });
        await task.save();
        res.status(200).send({ error: false, task, message: 'Task added successfully!' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: 'Internal server error!' });
    }

}


async function editTask(req: Request, res: Response): Promise<any> {
    const taskId = req.params.taskId;
    const { title, content, isCompleted } = req.body
    const { user } = req as Request & { user: any }

    if (!title && !content && !isCompleted) {
        return res.status(400).send({ error: true, message: 'No fields to update' });
    }

    try {
        const task = await Task.findOne({ _id: taskId, userId: user.user._id });
        if (!task) {
            return res.status(404).send({ error: true, message: 'Task not found' });
        }

        if (title) task.title = title;
        if (content) task.content = content;
        if (isCompleted) task.isCompleted = isCompleted;
        await task.save();
        res.status(200).send({ error: false, task, message: 'Task updated successfully!' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: 'Internal server error!' });
    }

}

async function getAllTasks(req: Request, res: Response): Promise<any> {

    const { user } = req as Request & { user: any }

    try {
        const tasks = await Task.find({ userId: user.user._id }).sort({ isCompleted: 1 });
        res.status(200).send({ error: false, tasks, message: 'All tasks fetched successfully!' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: 'Internal server error!' });
    }

}

async function deleteTask(req: Request, res: Response): Promise<any> {

    const taskId = req.params.taskId;
    const { user } = req as Request & { user: any }

    try {
        const tasks = await Task.findOne({ _id: taskId, userId: user.user._id });
        if (!tasks) {
            return res.status(404).send({ error: true, message: 'Task not found' });
        }
        await Task.deleteOne({ _id: taskId, userId: user.user._id });
        res.status(200).send({ error: false, message: 'Task deleted successfully!' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: 'Internal server error!' });
    }

}

async function updateTaskCompleted(req: Request, res: Response): Promise<any> {

    const taskId = req.params.taskId;
    const { user } = req as Request & { user: any }
    const { isCompleted } = req.body;

    try {
        const task = await Task.findOne({ _id: taskId, userId: user.user._id });
        if (!task) {
            return res.status(404).json({ error: true, message: 'Task not found' });
        }


        task.isCompleted = isCompleted || false;
        await task.save();
        res.status(200).json({ error: false, task, message: 'Task updated successfully!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal server error!' });
    }

}

async function searchTask(req: Request, res: Response): Promise<any> {

    const { user } = req as Request & { user: any }
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: 'Search query is required' });
    }
    try {

        const matchingTask = await Task.find({
            userId: user.user._id,
            $or: [
                { title: { $regex: new RegExp(query as string, "i") } },
                { content: { $regex: new RegExp(query as string, "i") } }
            ],
        });

        return res.status(200).json({ error: false, tasks: matchingTask, message: 'task matched successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal server error!' });
    }

}

export const taskController = {
    addTask,
    editTask,
    getAllTasks,
    deleteTask,
    updateTaskCompleted,
    searchTask
}
const express = require('express');
const taskUseCase = require('../usecases/Tasks');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const allTasks = await taskUseCase.getAll();
        res.json({
            success: true,
            message: 'All tasks',
            data: {
                tasks: allTasks,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch tasks',
            error: error.message,
        });
    }
});

router.patch('/tasks/todo/:name', async(req, res) => {
    try {
        const updatedTask = await taskUseCase.updateTaskfromTodo(
            req.params.name,
            req.body.data,
        );
        res.json({
            success: true,
            message: `task updated ${req.params.name}`,
            data: {
                updatedTask,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Failed to update task ${req.params.name}`,
            error: error.message,
        });
    }
});

router.delete('/tasks/:id/:tagName', async(req, res) => {
    const tagName = req.params.tagName;
    const taskId = req.params.id;

    try {
        const deletedTag = await taskUseCase.deleteTag(taskId, tagName);
        res.json({
            success: true,
            message: `tag deleted ${req.params.tagName} from ${taskId}`,
            data: {
                deletedTag,
            },
        });
    } catch (error) {}
});

router.patch('/tasks/manual/:id', async(req, res) => {
    try {
        const updatedTask = await taskUseCase.updateTask(
            req.params.id,
            req.body.data,
        );
        res.json({
            success: true,
            message: `task updated ${req.params.name}`,
            data: {
                updatedTask,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Failed to update task ${req.params.name}`,
            error: error.message,
        });
    }
});

router.post('/', async(req, res) => {
    try {
        const newTaskData = req.body;
        const newtask = await taskUseCase.create(newTaskData);
        res.json({
            success: true,
            message: 'All tasks',
            data: {
                newtask,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed creating a new task',
            error: error.message,
        });
    }
});

module.exports = router;
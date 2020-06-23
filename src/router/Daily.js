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

router.patch('/:name', async(req, res) => {
    try {
        const updatedTask = await taskUseCase.updatetask(req.params.name, req.body);
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
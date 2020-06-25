const express = require('express');
const projectUseCase = require('../usecases/Projects');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const allProjects = await projectUseCase.getAll();
        res.json({
            success: true,
            message: 'All projects',
            data: {
                projects: allProjects,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch projects',
            error: error.message,
        });
    }
});

router.patch('/:name', async(req, res) => {
    try {
        const updatedProject = await projectUseCase.updateProject(
            req.params.name,
            req.body,
        );
        res.json({
            success: true,
            message: `Project updated ${req.params.name}`,
            data: {
                updatedProject,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Failed to update project ${req.params.name}`,
            error: error.message,
        });
    }
});

router.patch('/push/:name', async(req, res) => {
    try {
        const updatedProject = await projectUseCase.pushIds(
            req.params.name,
            req.body,
        );
        res.json({
            success: true,
            message: `Project updated ${req.params.name}`,
            data: {
                updatedProject,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: `Failed to update project ${req.params.name}`,
            error: error.message,
        });
    }
});

router.post('/', async(req, res) => {
    try {
        const newProjectData = req.body;
        const newProject = await projectUseCase.create(newProjectData);
        res.json({
            success: true,
            message: 'All projects',
            data: {
                newProject,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed creating a new project',
            error: error.message,
        });
    }
});

module.exports = router;
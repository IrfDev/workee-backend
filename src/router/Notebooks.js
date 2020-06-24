const express = require('express');
var graph = require('../Lib/graph');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const notebooks = await graph.getNotebooks(
            req.user.oauthToken.token.access_token,
        );

        res.json({
            success: true,
            message: 'All projects',
            data: {
                notebooks,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch projects',
            error: error,
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
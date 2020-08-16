const express = require('express');
const resourceData = require('../usecases/Resources');
const notebookUsecase = require('../usecases/Notebooks');
const repoUsecase = require('../usecases/Repos');

const router = express.Router();

router.post('/custom', async(req, res) => {
    try {
        const newResourceData = req.body;
        const newResource = await resourceData.create(newResourceData);
        res.json({
            success: true,
            message: 'Post new custom resource',
            data: {
                newResource,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed creating a new custome resource',
            error: error.message,
        });
    }
});
router.post('/notebooks', async(req, res) => {
    try {
        const newResourceData = req.body;
        const newResource = await notebookUsecase.create(newResourceData);
        res.json({
            success: true,
            message: 'Post new notebook',
            data: {
                newResource,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed creating a new custome resource',
            error: error.message,
        });
    }
});
router.post('/repos', async(req, res) => {
    try {
        const newResourceData = req.body;
        const newResource = await repoUsecase.create(newResourceData);
        res.json({
            success: true,
            message: 'Post new repo',
            data: {
                newResource,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed creating a new repo',
            error: error.message,
        });
    }
});

module.exports = router;
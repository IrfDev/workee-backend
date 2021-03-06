const express = require('express');

const projectsRouter = require('../router/Projects');
const resourcesRouter = require('../router/Resources');
const sourcesRouter = require('../router/Sources');
const weeklyRouter = require('../router/Weekly');
const dailyRouter = require('../router/Daily');
const authRouter = require('../router/Auth');
const notebookRouter = require('../router/Notebooks');
const userRouter = require('../router/User');

module.exports = function(app) {
    app.use('/projects', projectsRouter);
    app.use('/resources', resourcesRouter);
    app.use('/sources', sourcesRouter);
    app.use('/notebooks', notebookRouter);
    app.use('/auth', authRouter);
    app.use('/daily', dailyRouter);
    app.use('/weekly', weeklyRouter);
    app.use('/user', userRouter);
    app.use(express.json);
};
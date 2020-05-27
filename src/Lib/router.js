const express = require('express');

const projectsRouter = require('../router/Projects');
const resourcesRouter = require('../router/Resources');
const sourcesRouter = require('../router/Sources');
const weeklyRouter = require('../router/Weekly');
const dailyRouter = require('../router/daily');

module.exports = function(app) {
    app.use('/projects', projectsRouter);
    app.use('/resources', resourcesRouter);
    app.use('/sources', sourcesRouter);
    app.use('/daily', dailyRouter);
    app.use('/weekly', weeklyRouter);
    app.use(express.json);
};
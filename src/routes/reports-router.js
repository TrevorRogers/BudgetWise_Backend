const reportsRouter = require('express').Router();
const { getReportsData } = require('../MVC/controllers/reports.controller');

reportsRouter.route('/:month').get(getReportsData);

module.exports = reportsRouter;

const overviewRouter = require('express').Router();
const {
  getFinancialOverview,
} = require('../MVC/controllers/homePage.controller');

overviewRouter.route('/').get(getFinancialOverview);

module.exports = overviewRouter;

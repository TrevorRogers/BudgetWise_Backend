const budgetRouter = require('express').Router();
const {
  getGroupedTransactions,
} = require('../MVC/controllers/budgetController');

budgetRouter.route('/').get(getGroupedTransactions);

module.exports = budgetRouter;

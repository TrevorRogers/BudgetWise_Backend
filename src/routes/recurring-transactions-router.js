const recurringTransactionsRouter = require('express').Router();
const {
  getAllUserRecurringTransactions,
  postRecurringTransaction,
} = require('../MVC/controllers/recurringTransactions.controller');

recurringTransactionsRouter
  .route('/')
  .get(getAllUserRecurringTransactions)
  .post(postRecurringTransaction);

module.exports = recurringTransactionsRouter;

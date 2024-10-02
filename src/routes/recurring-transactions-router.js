const recurringTransactionsRouter = require('express').Router();
const {
  getAllUserRecurringTransactions,
  postRecurringTransaction,
  patchRecurringAmount
} = require('../MVC/controllers/recurringTransactions.controller');

recurringTransactionsRouter
  .route('/')
  .get(getAllUserRecurringTransactions)
  .post(postRecurringTransaction);

  recurringTransactionsRouter.route("/:transaction_id").patch(patchRecurringAmount)

module.exports = recurringTransactionsRouter;

const apiRouter = require('express').Router();
const categoriesRouter = require('./categories-router');
const goalsRouter = require('./goals-router');
const ledgerRouter = require('./ledger-router');
const recurringTransactionsRouter = require('./recurring-transactions-router');
const usersRouter = require('./users-router');
const overviewRouter = require('./overview-router');
const budgetRouter = require('./budget-router');
const reportsRouter = require('./reports-router');
const { getApi } = require('../MVC/controllers/endpointsController');
const authVerify = require('../middleware/authVerify');

// API
apiRouter.get('/', getApi);

apiRouter.use('/users', usersRouter);

apiRouter.use('/categories', authVerify, categoriesRouter);
apiRouter.use('/goals', authVerify, goalsRouter);
apiRouter.use('/ledger', authVerify, ledgerRouter);
apiRouter.use(
  '/recurring_transactions',
  authVerify,
  recurringTransactionsRouter
);
apiRouter.use('/overview', authVerify, overviewRouter);
apiRouter.use('/budget', authVerify, budgetRouter);
apiRouter.use('/reports', authVerify, reportsRouter);

module.exports = apiRouter;

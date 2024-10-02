const apiRouter = require('express').Router();
const categoriesRouter = require('./categories-router');
const goalsRouter = require('./goals-router');
const ledgerRouter = require('./ledger-router');
const recurringTransactionsRouter = require('./recurring-transactions-router');
const usersRouter = require('./users-router');
const overviewRouter = require('./overview-router');
const budgetRouter = require('./budget-router');
const { getApi } = require('../MVC/controllers/endpointsController');

// API
apiRouter.get('/', getApi);

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/goals', goalsRouter);
apiRouter.use('/ledger', ledgerRouter);
apiRouter.use('/recurring_transactions', recurringTransactionsRouter);
apiRouter.use('/overview', overviewRouter);
apiRouter.use('/budget', budgetRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;

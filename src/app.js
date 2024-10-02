const express = require('express');
const cors = require('cors');
const { postUserLogin } = require('./MVC/controllers/user.controller');
const { getAllCategories } = require('./MVC/controllers/category.controller');
const { getApi } = require('./MVC/controllers/enpointsController')
const {
  getAllUserGoals,
  postGoal,
  deleteGoalById,
} = require('./MVC/controllers/goals.controller');
const {
  getAllUserLedger,
  postTransaction,
} = require('./MVC/controllers/ledger.controller');
const {
  getAllUserRecurringTransactions,
  postRecurringTransaction,
} = require('./MVC/controllers/recurringTransactions.controller');
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require('./errors');
const {
  getFinancialOverview,
} = require('./MVC/controllers/homePage.controller');
const {
  getGroupedTransactions,
} = require('./MVC/controllers/budgetController');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.context = {
    userId: 1,
  };
  next();
});

app.post('/api/users/auth', postUserLogin);

app.get('/api/categories', getAllCategories);

app.get('/api/goals', getAllUserGoals);
app.post('/api/goals', postGoal);
app.delete('/api/goals/:goal_id', deleteGoalById)

app.get('/api/ledger', getAllUserLedger);
app.post('/api/ledger', postTransaction);

app.get('/api/recurring_transactions', getAllUserRecurringTransactions);
app.post('/api/recurring_transactions', postRecurringTransaction);

app.get('/api/overview', getFinancialOverview);

app.get('/api/budget', getGroupedTransactions);

app.get('/api', getApi);

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;

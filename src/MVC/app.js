const express = require('express');
const { postUserLogin } = require('./controllers/user.controller');
const { getAllCategories } = require('./controllers/category.controller');
const { getAllUserGoals } = require('./controllers/goals.controller');
const { getAllUserLedger } = require('./controllers/ledger.controller');
const {
  getAllUserRecurringTransactions,
} = require('./controllers/recurringTransactions.controller');
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require('../errors');
const { getFinancialOverview } = require('./controllers/homePage.controller');
const { getGroupedTransactions } = require('./controllers/budgetController');

const app = express();

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

app.get('/api/ledger', getAllUserLedger);

app.get('/api/recurring_transactions', getAllUserRecurringTransactions);

app.get('/api/overview', getFinancialOverview);

app.get('/api/budget', getGroupedTransactions);

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;

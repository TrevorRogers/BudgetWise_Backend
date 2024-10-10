const express = require('express');
const cors = require('cors');

const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require('./errors');
const apiRouter = require('./routes/api-router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = app;

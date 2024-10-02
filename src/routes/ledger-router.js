const ledgerRouter = require('express').Router();
const {
  getAllUserLedger,
  postTransaction,
} = require('../MVC/controllers/ledger.controller');

ledgerRouter.route('/').get(getAllUserLedger).post(postTransaction);

module.exports = ledgerRouter;

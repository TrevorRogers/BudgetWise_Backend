const { insertTransaction } = require('../model/ledger.model');
const {
  selectUserRecurringTransactions,
  insertRecurringTransaction,
} = require('../model/recurringTransactions.model');

exports.getAllUserRecurringTransactions = (req, res, next) => {
  const { userId } = req.context;
  selectUserRecurringTransactions(userId)
    .then((recurring_transactions) => {
      res.status(200).send({ recurring_transactions });
    })
    .catch(next);
};

exports.postRecurringTransaction = (req, res, next) => {
  const { userId } = req.context;
  const { body } = req;

  insertRecurringTransaction(userId, body)
    .then((recTransaction) => {
      insertTransaction(userId, recTransaction).then((transaction) => {
        res.status(201).send({ recTransaction });
      });
    })
    .catch(next);
};

const { insertTransaction } = require('../model/ledger.model');
const {
  selectUserRecurringTransactions,
  insertRecurringTransaction,
  updateAmountById,
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
    .then((recurring_transaction) => {
      insertTransaction(userId, recurring_transaction).then((transaction) => {
        res.status(201).send({ recurring_transaction });
      });
    })
    .catch(next);
};

exports.patchRecurringAmount = (req, res, next) => {
  const { transaction_id } = req.params;
  const { inc_amount } = req.body;
  updateAmountById(transaction_id, inc_amount)
    .then((recurring_transaction) => {
      res.status(200).send({ recurring_transaction });
    })
    .catch(next);
};

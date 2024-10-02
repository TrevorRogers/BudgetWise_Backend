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
    .then((transactions) => {
      console.log(transactions);
      res.status(201).send({ transactions });
    })
    .catch(next);
};

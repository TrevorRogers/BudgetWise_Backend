const {
  fetchAllCurrentUserTransactions,
  insertTransaction,
} = require('../model/ledger.model');

exports.getAllUserLedger = (req, res, next) => {
  const { userId } = req.context;
  fetchAllCurrentUserTransactions(userId)
    .then((ledgers) => {
      res.status(200).send({ ledgers });
    })
    .catch(next);
};

exports.postTransaction = (req, res, next) => {
  const { userId } = req.context;
  const { body } = req;

  insertTransaction(userId, body)
    .then((transaction) => {
      res.status(201).send({ transaction });
    })
    .catch(next);
};

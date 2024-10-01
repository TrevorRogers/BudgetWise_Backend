const { fetchAllCurrentUserTransactions } = require('../model/ledger.model');

exports.getAllUserLedger = (req, res, next) => {
  // should update hardcoded value
  const { userId } = req.context;
  fetchAllCurrentUserTransactions(userId)
    .then((ledgers) => {
      res.status(200).send({ ledgers });
    })
    .catch((err) => {
      next(err);
    });
};

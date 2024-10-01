const { fetchAllUserLedger } = require("../model/ledger.model");

exports.getAllUserLedger = (req, res, next) => {
  // should update hardcoded value
  const userId = 1;
  fetchAllUserLedger(userId)
    .then((ledgers) => {
      res.status(200).send({ ledgers });
    })
    .catch((err) => {
      next(err);
    });
};

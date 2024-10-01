const {
  selectUserRecurringTransactions,
} = require('../model/recurringTransactions.model');

exports.getAllUserRecurringTransactions = (req, res, next) => {
  const { userId } = req.context;
  selectUserRecurringTransactions(userId)
    .then((recurring_transactions) => {
      res.status(200).send({ recurring_transactions });
    })
    .catch(next);
};

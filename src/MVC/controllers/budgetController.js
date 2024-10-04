const { fetchAllCurrentUserTransactions } = require('../model/ledger.model');
const {
  selectUserRecurringTransactions,
} = require('../model/recurringTransactions.model');

exports.getGroupedTransactions = (req, res, next) => {
  const { userId } = req.context;
  Promise.all([
    fetchAllCurrentUserTransactions(userId),
    selectUserRecurringTransactions(userId),
  ])
    .then(([ledgers, recurringTransactions]) => {
      const transactions = ledgers.reduce(
        (acc, transaction) => {
          if (transaction.essential && !transaction.is_credit) {
            acc.essential.push(transaction);
          }
          if (!transaction.essential && !transaction.is_credit) {
            acc.nonEssential.push(transaction);
          }

          return acc;
        },
        {
          essential: [],
          nonEssential: [],
        }
      );

      res.status(200).send({ transactions, recurringTransactions });
    })
    .catch(next);
};

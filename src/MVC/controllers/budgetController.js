const { fetchAllCurrentUserTransactions } = require('../model/ledger.model');

exports.getGroupedTransactions = (req, res, next) => {
  const { userId } = req.context;
  fetchAllCurrentUserTransactions(userId)
    .then((ledgers) => {
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
      res.status(200).send({ transactions });
    })
    .catch(next);
};

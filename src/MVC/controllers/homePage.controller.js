const { fetchAllUserGoals } = require('../model/goals.model');
const { fetchAllCurrentUserTransactions } = require('../model/ledger.model');

exports.getFinancialOverview = (req, res, next) => {
  const { userId } = req.context;
  Promise.all([
    fetchAllCurrentUserTransactions(userId),
    fetchAllUserGoals(userId),
  ])
    .then(([ledgersData, goalsData]) => {
      const result = ledgersData.reduce(
        (acc, transaction) => {
          if (transaction.is_credit) {
            acc.income += +transaction.amount;
          }
          if (transaction.transaction_id && !transaction.is_credit) {
            acc.monthlyBills += +transaction.amount;
          }
          if (!transaction.is_credit && !transaction.transaction_id) {
            acc.spending += +transaction.amount;
          }

          return acc;
        },
        {
          income: 0,
          monthlyBills: 0,
          spending: 0,
        }
      );

      const goalsTotals = goalsData.reduce(
        (acc, goal) => {
          acc.totalGoalsTarget += +goal.target_amount;
          acc.totalGoalsProgress += +goal.amount_saved;
          return acc;
        },
        {
          totalGoalsProgress: 0,
          totalGoalsTarget: 0,
        }
      );

      res.status(200).send({
        overview: {
          ...result,
          remainingBalance:
            result.income - (result.monthlyBills + result.spending),
          ...goalsTotals,
        },
      });
    })
    .catch((err) => {
      next(err);
    });
};

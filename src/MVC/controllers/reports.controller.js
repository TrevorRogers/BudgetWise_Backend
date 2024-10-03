const { selectAllYearFromDateTransactions } = require('../model/ledger.model');
const { months } = require('../../utils/constants');
const { createShortDate } = require('../../utils/helpers');
const { fetchAllCategories } = require('../model/category.model');

exports.getReportsData = (req, res, next) => {
  const { month } = req.params;
  const { userId } = req.context;

  Promise.all([fetchAllCategories(), selectAllYearFromDateTransactions(userId)])
    .then(([categories, annualTransactions]) => {
      const monthIndex = months.indexOf(month);

      const monthsTransactions = annualTransactions.filter((transaction) => {
        return new Date(transaction.created_at).getMonth() === monthIndex;
      });

      const monthsIncome = monthsTransactions.filter(
        (transaction) => transaction.is_credit
      );
      const monthsOutgoings = monthsTransactions.filter(
        (transaction) => !transaction.is_credit
      );

      const income = monthsIncome.reduce((acc, trans) => {
        acc += +trans.amount;
        return acc;
      }, 0);
      const spending = monthsOutgoings.reduce((acc, trans) => {
        acc += +trans.amount;
        return acc;
      }, 0);
      const essentialVsNonEssential = monthsOutgoings.reduce(
        (acc, transaction) => {
          if (transaction.essential) {
            acc.essential += +transaction.amount;
          }
          if (!transaction.essential) {
            acc.nonEssential += +transaction.amount;
          }

          return acc;
        },
        {
          essential: 0,
          nonEssential: 0,
        }
      );

      const initialCategoryObj = categories.reduce((acc, category) => {
        acc[category.name] = 0;
        return acc;
      }, {});

      const spendingByCategory = monthsOutgoings.reduce((acc, trans) => {
        acc[trans.category] += +trans.amount;

        return acc;
      }, initialCategoryObj);

      const dailySpending = monthsOutgoings.reduce((acc, trans) => {
        const label = createShortDate(trans.created_at);
        if (!acc[label]) {
          acc[label] = {
            amount: +trans.amount,
            transactionNames: [trans.name],
          };
        } else {
          acc[label].amount += +trans.amount;
          acc[label].transactionNames.push(trans.name);
        }

        return acc;
      }, {});

      let runningBalance = income;
      const dailyBalances = Object.entries(dailySpending)
        .sort((a, b) => a[0].split(' ')[1] - b[0].split(' ')[1])
        .reduce((acc, [day, val]) => {
          runningBalance -= val.amount;
          acc[day] = {
            balance: runningBalance,
            transactionNames: val.transactionNames,
          };

          return acc;
        }, {});

      const reports = {
        spentVsSaved: {
          spending: spending,
          saved: income - spending,
        },
        essentialVsNonEssential,
        spendingByCategory,
        dailyBalances,
      };

      console.log(reports);
      res.status(200).send({ reports });
    })
    .catch(next);
};

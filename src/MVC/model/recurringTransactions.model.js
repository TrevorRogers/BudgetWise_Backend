const db = require('../../db/connection');

exports.selectUserRecurringTransactions = (userId) => {
  return db
    .query('SELECT * FROM recurring_transactions WHERE user_id = $1', [userId])
    .then(({ rows }) => rows);
};

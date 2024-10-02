const db = require('../../db/connection');

exports.selectUserRecurringTransactions = (userId) => {
  return db
    .query('SELECT * FROM recurring_transactions WHERE user_id = $1', [userId])
    .then(({ rows }) => rows);
};

exports.insertRecurringTransaction = (userId, body) => {
  console.log("here")
  const { name, amount, category_id, essential, is_credit, date_due, is_active } = body;
  return db
    .query(
      `INSERT INTO recurring_transactions (user_id, name, amount, category_id, essential, is_credit, date_due, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [userId, name, amount, category_id, essential, is_credit, date_due, is_active]
    )
    .then(({ rows }) => rows[0]);
};

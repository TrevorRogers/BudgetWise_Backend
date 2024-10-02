const db = require('../../db/connection');

exports.selectUserRecurringTransactions = (userId) => {
  return db
    .query(
      `SELECT recurring_transactions.transaction_id, recurring_transactions.user_id, recurring_transactions.name, recurring_transactions.amount, recurring_transactions.essential, recurring_transactions.is_credit, categories.name 
      AS category 
      FROM recurring_transactions 
      JOIN categories 
      ON recurring_transactions.category_id = categories.category_id 
      WHERE user_id = $1`,
      [userId]
    )
    .then(({ rows }) => rows);
};

exports.insertRecurringTransaction = (userId, body) => {
  const {
    name,
    amount,
    category_id,
    essential,
    is_credit,
    date_due,
    is_active,
  } = body;
  return db
    .query(
      `INSERT INTO recurring_transactions (user_id, name, amount, category_id, essential, is_credit, date_due, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        userId,
        name,
        amount,
        category_id,
        essential,
        is_credit,
        date_due,
        is_active,
      ]
    )
    .then(({ rows }) => rows[0]);
};

exports.updateAmountById = (transaction_id, inc_amount) => {
  const queryStr = ``
      const queryVals = [transaction_id, inc_amount]

  return db.query(queryStr, queryVals).then(({rows}) => {
      if (rows.length === 0) return Promise.reject({msg: "Not found"})
          return rows[0];
      
  })
}

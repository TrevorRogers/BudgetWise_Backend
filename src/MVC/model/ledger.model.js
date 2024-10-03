const db = require('../../db/connection');

exports.fetchAllCurrentUserTransactions = (userId) => {
  let SQLQuery = `
  SELECT
    ledger.ledger_id, ledger.created_at, ledger.user_id, ledger.name, ledger.amount, ledger.essential, ledger.is_credit, categories.name AS category
  FROM 
    ledger
  LEFT OUTER JOIN categories ON ledger.category_id = categories.category_id
  WHERE 
    user_id = $1
  AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
  AND created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
  ORDER BY created_at DESC
`;

  return db.query(SQLQuery, [userId]).then(({ rows }) => {
    return rows;
  });
};

exports.selectAllYearFromDateTransactions = (userId) => {
  return db
    .query(
      `SELECT
    ledger.ledger_id, ledger.created_at, ledger.user_id, ledger.name, ledger.amount, ledger.essential, ledger.is_credit, categories.name AS category
  FROM 
    ledger
  LEFT OUTER JOIN categories ON ledger.category_id = categories.category_id WHERE user_id = $1 
    AND
    created_at >= (CURRENT_DATE - INTERVAL '1 YEAR')
    AND
    created_at <= CURRENT_DATE ORDER BY created_at DESC`,
      [userId]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertTransaction = (userId, body) => {
  const { name, amount, category_id, essential, is_credit, transaction_id } =
    body;
  return db
    .query(
      `INSERT INTO ledger (user_id, name, amount, category_id, essential, is_credit, transaction_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [userId, name, amount, category_id, essential, is_credit, transaction_id]
    )
    .then(({ rows }) => rows[0]);
};

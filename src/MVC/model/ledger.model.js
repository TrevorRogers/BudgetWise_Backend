const db = require('../../db/connection');

exports.fetchAllCurrentUserTransactions = (userId) => {
  let SQLQuery = `
  SELECT
    *
  FROM 
    ledger
  WHERE 
    user_id = $1
  AND created_at >= DATE_TRUNC('month', CURRENT_DATE)
  AND created_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
  ORDER BY created_at DESC
`;

  return db
    .query(SQLQuery, [userId])
    .then(({ rows }) => {
      // can put some error handling here
      return rows;
    })
    .catch((err) => {
      return err;
      // can refactor and do a custom reject status + msg
    });
};

exports.selectAllYearFromDateTransactions = (userId) => {
  return db
    .query(
      `SELECT * FROM ledger WHERE user_id = $1 
    AND
    created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
    AND
    created_at < CURDATE() ORDER BY created_at DESC`,
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

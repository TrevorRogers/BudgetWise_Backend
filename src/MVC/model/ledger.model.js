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

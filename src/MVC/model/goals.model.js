const db = require('../../db/connection');
exports.fetchAllUserGoals = (userId) => {
  let SQLQuery = `
  SELECT 
    * 
  FROM 
    goals
  WHERE 
    user_id = $1
  `;

  return db
    .query(SQLQuery, [userId])
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      return err;
    });
};

exports.insertGoal = (userId, body) => {
  const { name, target_amount, amount_saved, date_due } = body;
  return db
    .query(
      'INSERT INTO goals (user_id, name, target_amount, amount_saved, date_due) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, name, target_amount, amount_saved, date_due]
    )
    .then(({ rows }) => rows[0]);
};

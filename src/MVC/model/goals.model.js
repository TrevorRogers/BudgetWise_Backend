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

exports.removeGoalById = (goal_id) => {
  return db
    .query('DELETE FROM goals WHERE goal_id = $1;', [goal_id])
    .then((result) => {
      if (result.rowCount === 0)
        return Promise.reject({ status: 404, msg: 'Not found' });
      return result;
    });
};

exports.updateGoalsById = (goal_id, inc_amount_saved, target_amount=0) => {
  const queryStr = `UPDATE goals
      SET amount_saved = amount_saved + $2,
       target_amount = target_amount + $3
      WHERE goals.goal_id = $1
      RETURNING *;`
      const queryVals = [goal_id, inc_amount_saved, target_amount]

  return db.query(queryStr, queryVals).then(({rows}) => {
      if (rows.length === 0) return Promise.reject({msg: "Not found"})
          return rows[0];
      
  })
}

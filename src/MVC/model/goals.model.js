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
      // error handling goes here
      return rows;
    })
    .catch((err) => {
      return err;
      // similarly, can put a promise reject here for extra error handling
    });
};

const db = require("../../db/connection");
exports.fetchAllUserGoals = (userId) => {
  //error handling
  if (isNaN(userId)) {
    return Promise.reject({
      status: 400,
      msg: "username variable not inputted",
    });
  }

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

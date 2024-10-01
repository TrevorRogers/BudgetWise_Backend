const db = require("../../db/connection");
exports.fetchAllUserLedger = (userId) => {
  //error handling
  if (isNaN(userId)) {
    return Promise.reject({
      status: 400,
      msg: "username variable not inputted",
    });
  }

  console.log("here in model");

  // UPDATE THIS TO MAKE IT DYNAMIC SO THAT DATES ARE NOT HARDCODED
  let SQLQuery = `
  SELECT
    *
  FROM 
    ledger
  WHERE 
    user_id = $1
  AND
    created_at >= "2024-09-01"
  AND
    created_at < "2024-10-01"

`;

  return db
    .query(SQLQuery, [userId])
    .then(({ rows }) => {
      // can put some error handling here
      console.log(rows, "any row");
      return rows;
    })
    .catch((err) => {
      return err;
      // can refactor and do a custom reject status + msg
    });
};

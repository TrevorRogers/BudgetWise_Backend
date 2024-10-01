const db = require("../../db/connection");

exports.fetchPostUsernameCredentials = (username) => {
  //error handling
  if (!username) {
    return Promise.reject({
      status: 400,
      msg: "username variable not inputted",
    });
  }

  let mySQLQuery = `
    SELECT 
        *
    FROM
        users
    WHERE
        username = $1
    `;

  return db
    .query(mySQLQuery, [username])
    .then(({ rows }) => {
      // error handling
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No users found by username",
        });
      }
      return rows[0];
    })
    .catch((err) => {
      console.log("database error");
      console.error(err);
      return Promise.reject({
        status: 500,
        msg: "Internal Server Error: database query failed",
      });
    });
};

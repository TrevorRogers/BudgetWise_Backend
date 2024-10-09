const db = require('../../db/connection');

exports.selectUserByUsername = (username) => {
  //error handling
  if (!username) {
    return Promise.reject({
      status: 400,
      msg: 'username variable not inputted',
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

  return db.query(mySQLQuery, [username]).then(({ rows }) => {
    // error handling
    // if (rows.length === 0) {
    //   return Promise.reject({
    //     status: 400,
    //     msg: 'Incorrect login',
    //   });
    // }
    return rows[0];
  });
};

exports.createUser = (username, passwordHash) => {
  return db
    .query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, passwordHash]
    )
    .then(({ rows }) => rows[0]);
};

const db = require("../../db/connection");
exports.fetchAllCategories = () => {
  // sql string
  let SQLString = `
    SELECT
        * 
    FROM
        categories
    `;

  // db.query(x, [y])
  return db
    .query(SQLString)
    .then(({ rows }) => {
      // error handling
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No categories found by username",
        });
      }
      return rows;
    })
    .catch((err) => {
      return Promise.reject({
        status: 500,
        msg: "Internal Server Error: database query failed",
      });
    });
};

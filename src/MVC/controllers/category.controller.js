const { fetchAllCategories } = require("../model/category.model");

exports.getAllCategories = (req, res, next) => {
  fetchAllCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

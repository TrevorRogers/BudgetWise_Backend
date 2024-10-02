const categoriesRouter = require('express').Router();
const { getAllCategories } = require('../MVC/controllers/category.controller');

categoriesRouter.route('/').get(getAllCategories);

module.exports = categoriesRouter;

const usersRouter = require('express').Router();
const { postUserLogin } = require('../MVC/controllers/user.controller');

usersRouter.route('/auth').post(postUserLogin);

module.exports = usersRouter;

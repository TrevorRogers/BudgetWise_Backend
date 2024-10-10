const usersRouter = require('express').Router();
const {
  postUserLogin,
  postUserSignUp,
  postUserLogout,
} = require('../MVC/controllers/user.controller');

usersRouter.route('/').post(postUserSignUp);
usersRouter.route('/auth/login').post(postUserLogin);
usersRouter.route('/auth/logout').post(postUserLogout);

module.exports = usersRouter;

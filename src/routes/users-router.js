const usersRouter = require('express').Router();
const {
  postUserLogin,
  postUserSignUp,
} = require('../MVC/controllers/user.controller');

usersRouter.route('/').post(postUserSignUp);
usersRouter.route('/auth').post(postUserLogin);

module.exports = usersRouter;

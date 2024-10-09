const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { selectUserByUsername, createUser } = require('../model/user.model');

exports.postUserLogin = (req, res, next) => {
  const { username, password } = req.body;

  selectUserByUsername(username)
    .then(async (user) => {
      if (!user) {
        return next({
          status: 400,
          msg: 'Incorrect login',
        });
      }

      // Check password hash using bcrypt
      const validPassword = await bcrypt.compare(password, user.password);

      // If not valid, return next with error
      if (!validPassword) {
        return next({ status: 400, msg: 'Incorrect login' });
      }

      // If valid, create a JWT
      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        process.env.TOKEN_SECRET,
        {
          noTimestamp: true,
          expiresIn: '24h',
        }
      );

      res.status(200).send({
        user: {
          username: user.username,
          access_token: token,
        },
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUserSignUp = (req, res, next) => {
  const { username, password } = req.body;

  selectUserByUsername(username)
    .then(async (user) => {
      if (user) {
        next({ status: 400, msg: 'Account already exists' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      createUser(username, hashedPassword).then((user) => {
        const token = jwt.sign(
          { userId: user.user_id, username: user.username },
          process.env.TOKEN_SECRET,
          {
            noTimestamp: true,
            expiresIn: '24h',
          }
        );

        res.status(200).send({
          user: {
            username: user.username,
            access_token: token,
          },
        });
      });
    })
    .catch(next);
};

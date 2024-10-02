const { selectUserByUsername } = require('../model/user.model');

exports.postUserLogin = (req, res, next) => {
  const { username, password } = req.body;

  selectUserByUsername(username)
    .then((userItem) => {
      res.status(200).send({ username: userItem.username });
    })
    .catch((err) => {
      next(err);
    });
};

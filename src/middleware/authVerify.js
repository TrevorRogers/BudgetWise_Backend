const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return next({ status: 401, msg: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.context = {
      userId: verified.userId,
    };
    next();
  } catch (err) {
    next({ status: 401, msg: err });
  }
};

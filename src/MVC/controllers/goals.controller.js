const { fetchAllUserGoals, insertGoal } = require('../model/goals.model');

exports.getAllUserGoals = (req, res, next) => {
  const { userId } = req.context;

  fetchAllUserGoals(userId)
    .then((goals) => {
      res.status(200).send({ goals });
    })
    .catch(next);
};

exports.postGoal = (req, res, next) => {
  const { userId } = req.context;
  const { body } = req;

  insertGoal(userId, body)
    .then((goal) => {
      res.status(201).send({ goal });
    })
    .catch(next);
};

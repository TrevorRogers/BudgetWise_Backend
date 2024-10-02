const { fetchAllUserGoals, insertGoal, removeGoalById} = require('../model/goals.model');

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

exports.deleteGoalById = (req, res, next) => {
  const { goal_id } = req.params;
  removeGoalById(goal_id).then((result) => {
          res.status(204).send();      
  }).catch(next)
};

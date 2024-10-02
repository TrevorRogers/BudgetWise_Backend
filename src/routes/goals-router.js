const goalsRouter = require('express').Router();
const {
  getAllUserGoals,
  postGoal,
  deleteGoalById,
} = require('../MVC/controllers/goals.controller');

goalsRouter.route('/').get(getAllUserGoals).post(postGoal);
goalsRouter.route('/:goal_id').delete(deleteGoalById);

module.exports = goalsRouter;

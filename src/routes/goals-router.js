const goalsRouter = require('express').Router();
const {
  getAllUserGoals,
  postGoal,
  deleteGoalById,
  patchGoals
} = require('../MVC/controllers/goals.controller');

goalsRouter.route('/').get(getAllUserGoals).post(postGoal);
goalsRouter.route('/:goal_id').delete(deleteGoalById).patch(patchGoals);


module.exports = goalsRouter;

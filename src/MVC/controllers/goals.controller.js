const { fetchAllUserGoals } = require('../model/goals.model');

exports.getAllUserGoals = (req, res, next) => {
  // THIS NEEDS TO BE CHANGED !!!!!!!!!!!!!!!
  // const { userID } = res.user; // we will get the object from the res object, for now hard code the value
  //
  // temporary hard coded value
  const { userId } = req.context; // should update in future

  fetchAllUserGoals(userId)
    .then((goals) => {
      res.status(200).send({ goals });
    })
    .catch((err) => {
      next(err);
    });
};

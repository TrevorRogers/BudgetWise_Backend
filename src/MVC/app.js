const express = require("express");
const { postUserLogin } = require("./controllers/user.controller");
const { getAllCategories } = require("./controllers/category.controller");
const { getAllUserGoals } = require("./controllers/goals.controller");
const { getAllUserLedger } = require("./controllers/ledger.controller");

const app = express();

app.use(express.json());

// app.use(err, req, res, next);

app.post("/api/users/auth", postUserLogin);

app.get("/api/categories", getAllCategories);

app.get("/api/goals", getAllUserGoals);

app.get("/api/ledger", getAllUserLedger);

module.exports = app;

const express = require("express");
const { postUserLogin } = require("./controllers/postUserLogin.controller");

const app = express();

app.use(express.json());

app.post("/api/users/auth", postUserLogin);

module.exports = app;

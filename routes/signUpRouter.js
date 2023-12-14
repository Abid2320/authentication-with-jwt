const express = require("express");
const { signUp } = require("../controllers/signUp");
const signUpRouter = express.Router();

signUpRouter.post("/", signUp);

module.exports = signUpRouter;

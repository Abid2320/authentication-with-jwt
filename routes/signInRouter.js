const express = require("express");
const signIn = require("../controllers/signIn");
const signInRouter = express.Router();

signInRouter.post("/", signIn);

module.exports = signInRouter;

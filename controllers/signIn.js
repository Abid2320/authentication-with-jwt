const SignUpModel = require("../models/signUpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const maxAge = 24 * 60 * 60;
const createToken = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWTSECRET);
  return token;
};

const signIn = async (req, res) => {
  // check user data
  const userData = req.body;
  if (!userData.email || !userData.password) {
    res.status(400).json({
      success: false,
      message: "Something went wrong please check all the fields",
    });
  }
  // check if the user have an account in the database
  try {
    const user = await SignUpModel.findOne({ email: userData.email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { password, ...rest } = user._doc;
    const hashedPass = bcrypt.compareSync(userData.password, user.password);
    // check if the password has matched or not
    if (!hashedPass) {
      res.status(401).json({
        success: false,
        message: "Something went wrong check your email or password",
      });
    }
    // send the respons to the client
    const token = await createToken(res._id);
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      data: rest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = signIn;

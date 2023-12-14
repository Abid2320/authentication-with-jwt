const SignUpModel = require("../models/signUpModel");
const bcrypt = require("bcryptjs");

// error handler
const handleError = (err) => {
  console.log(err.code, err);
  let errors = { name: "", email: "", password: "" };
  if (err.code === 11000) {
    console.log(true);
    errors.email = "Email already has an account";
  }
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const signUp = async (req, res) => {
  // get the user data and verify
  const userData = req.body;
  if (!userData.name || !userData.email || !userData.password) {
    res.status(301).json({
      error: {
        suceess: false,
        message: "Something went wrong please check all the field",
      },
    });
  }
  // check if the user already exist
  try {
    // encryp user password
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPass = bcrypt.hashSync(userData.password, salt);
    // create user in the database
    const user = await SignUpModel.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
    // const userObj = user.toObject();
    const { password, ...rest } = user._doc;
    // send respons to client
    res.status(200).json({
      success: true,
      data: rest,
    });
  } catch (err) {
    // catch error
    const errors = handleError(err);
    console.log(errors);
    res.json(errors);
  }
};

module.exports = {
  signUp,
};

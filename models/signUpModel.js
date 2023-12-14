const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

// Create schema for sign up
const SignUpSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name atleast should be 3 character long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: isEmail,
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password should be atleast 6 character long"],
    },
  },
  { timestamps: true }
);
SignUpSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(this.password, salt);
  this.password = hashedPass;
  next();
});
// Create model
const SignUpModel = mongoose.model("users", SignUpSchema);
// export model

module.exports = SignUpModel;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const cookieParser = require("cookie-parser");
const { requiredAuth } = require("./middlewares/requiredAuth");
const app = express();

app.use(express.json());
app.use(cookieParser());

const mongoUrl = process.env.MONGOURL;
const port = process.env.PORT;

app.use("/signup", signUpRouter);
app.use("/signin", signInRouter);

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Mongo db has been connected succesfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", requiredAuth, (req, res) => {
  res.json({
    message: "Home is loadded",
  });
});

app.get("/about", requiredAuth, (req, res) => {
  res.json({
    message: "About is loaded",
  });
});

app.get("/products", requiredAuth, (req, res) => {
  res.json({
    message: "Product is loaded",
  });
});

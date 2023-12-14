const jwt = require("jsonwebtoken");

const requiredAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        console.log(decodedToken);
        res.redirect("/signin");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/signin");
  }
};

module.exports = { requiredAuth };

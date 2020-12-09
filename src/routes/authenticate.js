const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const authRouter = router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password

  // I am using a simple array users which i made above
  if (username == process.env.ENV_USER && password == process.env.PASSWORD) {
    //If all credentials are correct do this
    let token = jwt.sign(
      { id: 0001, username: username },
      "welldinner2020reactnodewebapp",
      { expiresIn: 129600 }
    ); // Sigining the token
    res.json({
      sucess: true,
      err: null,
      token,
    });
  } else {
    res.status(401).json({
      sucess: false,
      token: null,
      err: "Username or password is incorrect",
    });
  }
});

module.exports = authRouter;

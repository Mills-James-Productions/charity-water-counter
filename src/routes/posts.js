const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("yed");
});

module.exports = router;

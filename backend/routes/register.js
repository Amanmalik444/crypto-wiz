const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body)
  const { name, userName, password } = req.body;
  const newUser = new User({
    name,
    userName,
    password,
  });

  newUser
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error occured");
    });
});

module.exports = router;

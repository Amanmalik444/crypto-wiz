const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passport = require("passport");
const local = require("passport-local").Strategy;

const router = express.Router();

const generateAuthTokenForUser = (user, callback) => {
  jwt.sign(
    {
      name: user.name,
      userName: user.userName,
      password: user.password,
    },
    process.env.HASH_KEY,
    { expiresIn: "2 days" },
    (err, token) => {
      callback(err, {
        success: true,
        token: "Bearer " + token,
      });
    }
  );
};

router.post("/", (req, res) => {
  User.findOne({ userName: req.body.userName })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then((validPass) => {
          if (validPass) {
            generateAuthTokenForUser(user, (error, data) => {
              console.log("logged In");
              res.json({ data, user });
            });
          } else {
            res.status(500).json("password do not match");
          }
        });
      } else {
        res.status(500).json("user does not exist");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("trouble reaching the server");
    });
});

module.exports = router;

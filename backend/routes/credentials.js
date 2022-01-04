const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, userName, password, profilePicIndex } = req.body;
    const newUser = await new User({
      name,
      userName,
      password,
      profilePicIndex,
    });

    await newUser.save();
    res.json("Registered");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error occured");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (validPass) {
        await generateAuthTokenForUser(user, (error, data) => {
          console.log("logged In");

          const userBody = {
            favouriteCoins: user.favouriteCoins,
            followers: user.followers,
            _id: user._id,
            name: user.name,
            userName: user.userName,
            createdAt: user.createdAt,
            profilePicIndex: user.profilePicIndex,
          };

          res.json({ data, user: userBody });
        });
      } else {
        res.status(500).json("password do not match");
      }
    } else {
      res.status(500).json("user does not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
});

const generateAuthTokenForUser = (user, callback) => {
  jwt.sign(
    {
      name: user.name,
      userName: user.userName,
      password: user.password,
      _id: user._id,
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

module.exports = router;

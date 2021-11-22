const express = require("express");
const user = require("../models/user");

const router = express.Router();

// get user
router.post("/getUser", (req, res) => {
  user
    .findById(req.body.userId)
    .then((u) => {
      res.json(u);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

// delete user
router.post("/deleteUser", (req, res) => {
  user
    .findByIdAndRemove(req.body.id)
    .then((u) => {
      res.json(u);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

module.exports = router;

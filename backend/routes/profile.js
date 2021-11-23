const express = require("express");
const user = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

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

router.post("/updateUser", (req, res) => {
  const { userId, name, userName, currPassword, newPassword } =
    req.body.updatedProfileBody;

  user
    .findById(userId)
    .then((u) => {
      bcrypt.compare(currPassword, u.password).then((validPass) => {
        if (validPass) {
          if (name && u.name !== name) {
            u.name = name;
          }
          if (userName && u.userName !== userName) {
            u.userName = userName;
          }
          if (newPassword && u.password !== newPassword) {
            u.password = newPassword;
          }
          u.save()
            .then(() => {
              res.json({
                user: u,
                status: newPassword
                  ? "Password changed successfully"
                  : "Profile updated successfully",
              });
            })
            .catch((err) => {
              res.status(500).json({ status: "Error updating profile" });
            });
        } else {
          res.status(500).json({ status: "password do not match" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

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

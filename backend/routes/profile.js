const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const favourite = require("../models/favourite");
const user = require("../models/user");

const router = express.Router();

router.post("/getUser", async (req, res) => {
  try {
    const u = await user.findById(req.body.userId);

    res.json(u);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/fetchFollowersAndFavouritesByUserId", async (req, res) => {
  try {
    const { userId } = req.body;

    const favData = await favourite.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
    ]);

    const userData = await user.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      { $project: { followersNumber: { $size: "$followers" } } },
      { $unwind: "$followersNumber" },
    ]);
                                   
    followersNumber = userData[0].followersNumber;

    const body = { followersNumber, favData };

    res.json(body);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/updateProfilePic", async (req, res) => {
  try {
    const { profilePicIndex, userId } = req.body;

    const oldUser = await user.findByIdAndUpdate(userId, {
      profilePicIndex,
    });

    const updatedUser = {
      favouriteCoins: oldUser.favouriteCoins,
      followers: oldUser.followers,
      _id: oldUser._id,
      name: oldUser.name,
      userName: oldUser.userName,
      createdAt: oldUser.createdAt,
      profilePicIndex,
    };

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateUser", async (req, res) => {
  try {
    const { userId, name, userName, currPassword, newPassword } =
      req.body.updatedProfileBody;

    let oldUser = await user.findById(userId);
    const validPass = await bcrypt.compare(currPassword, oldUser.password);

    if (validPass) {
      if (name && oldUser.name !== name) {
        oldUser.name = name;
      }
      if (userName && oldUser.userName !== userName) {
        oldUser.userName = userName;
      }
      if (newPassword && oldUser.password !== newPassword) {
        oldUser.password = newPassword;
      }
      await oldUser.save();

      const updatedUser = {
        favouriteCoins: oldUser.favouriteCoins,
        followers: oldUser.followers,
        _id: oldUser._id,
        name: name ? name : oldUser.name,
        userName: userName ? userName : oldUser.userName,
        createdAt: oldUser.createdAt,
        profilePicIndex: oldUser.profilePicIndex,
      };

      res.json({
        user: updatedUser,
        status: newPassword
          ? "Password changed successfully"
          : "Profile updated successfully",
      });
    } else {
      res.status(500).json({ status: "password do not match" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/deleteUser", async (req, res) => {
  try {
    const u = await user.findByIdAndRemove(req.body.id);

    res.json(u);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

module.exports = router;

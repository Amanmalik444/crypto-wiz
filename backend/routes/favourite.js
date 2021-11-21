const express = require("express");
const favourite = require("../models/favourite");
const user = require("../models/user");

const router = express.Router();

router.post("/setAsFavourite", (req, res) => {
  const { userId, cardData, favId } = req.body;
  const newFavourite = new favourite({
    userId,
    cardData,
    favId,
  });
  newFavourite
    .save()
    .then(() => {
      user
        .updateOne({ _id: userId }, { $push: { favouriteCoins: favId } })
        .then(() => {
          res.json("Coin set successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

router.post("/removeFromFavourite", (req, res) => {
  const { userId, favId } = req.body;
  favourite
    .findOneAndDelete({ favId })
    .then(() => {
      user
        .updateOne({ _id: userId }, { $pull: { favouriteCoins: favId } })
        .then(() => {
          res.json("Coin Removed successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

router.post("/fetchByFavId", (req, res) => {
  favourite
    .findOne({ favId: req.body.favId })
    .then((f) => {
      res.json(f ? true : false);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

router.post("/fetchByUserId", (req, res) => {
  const { userId } = req.body;
  favourite
    .find({ userId })
    .sort({ createdAt: -1 })
    .then((favData) => {
      user.findById(userId).then((user) => {
        const body = { followersNumber: user.followers.length, favData };
        res.json(body);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

module.exports = router;

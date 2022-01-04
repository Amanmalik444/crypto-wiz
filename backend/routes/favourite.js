const express = require("express");

const favourite = require("../models/favourite");
const user = require("../models/user");

const router = express.Router();

router.post("/setAsFavourite", async (req, res) => {
  try {
    const { userId, cardData, favId } = req.body;
    const newFavourite = await new favourite({
      userId,
      cardData,
      favId,
    });

    await Promise.all([
      newFavourite.save(),
      user.updateOne({ _id: userId }, { $push: { favouriteCoins: favId } }),
    ]);

    res.json("Coin set successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/removeFromFavourite", async (req, res) => {
  try {
    const { userId, favId } = req.body;

    await Promise.all([
      favourite.findOneAndDelete({ favId }),
      user.updateOne({ _id: userId }, { $pull: { favouriteCoins: favId } }),
    ]);

    res.json("Coin Removed successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/fetchFavListUser", async (req, res) => {
  try {
    const { userId } = req.body;
    const u = await user.findById(userId, "favouriteCoins");

    res.json(u?.favouriteCoins);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

module.exports = router;

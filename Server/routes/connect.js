const express = require("express");

const user = require("../models/user");
const connection = require("../models/connection");

const router = express.Router();

router.post("/FollowTabList", async (req, res) => {
  try {
    const userBody = await user.find(
      { _id: { $ne: req.body.userId } },
      "name userName profilePicIndex createdAt favouriteCoins"
    );

    res.json(userBody);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/RequestsTabList", async (req, res) => {
  try {
    const conn = await connection
      .find({ userId: req.body.userId, status: { $ne: "Accepted" } })
      .populate(
        "requestorId",
        "name userName profilePicIndex createdAt favouriteCoins"
      );
    res.json(conn);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/FollowersTabList", async (req, res) => {
  try {
    const conn = await connection
      .find({ userId: req.body.userId, status: "Accepted" })
      .populate(
        "requestorId",
        "name userName profilePicIndex createdAt favouriteCoins"
      );
    res.json(conn);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/FetchFollowingUsers", async (req, res) => {
  try {
    const { requestorId } = req.body;
    const conn = await connection
      .find({ requestorId, status: "Accepted" }, "userId")
      .populate("userId", "name userName profilePicIndex");
    res.json(conn);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/Follow", async (req, res) => {
  try {
    const { userId, toConnectId } = req.body;
    //switching Ids
    const newConnect = await new connection({
      userId: toConnectId,
      requestorId: userId,
      status: "Pending",
    });
    await newConnect.save();
    res.json("Pending");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/Accept", async (req, res) => {
  try {
    const { userId, toConnectId } = req.body;

    await Promise.all([
      user.updateOne({ _id: userId }, { $push: { followers: toConnectId } }),
      connection.updateOne(
        { userId, requestorId: toConnectId },
        { status: "Accepted" }
      ),
    ]);

    res.json("Accepted");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/Remove", async (req, res) => {
  try {
    const { userId, toConnectId } = req.body;

    await Promise.all([
      connection.findOneAndRemove({ userId, requestorId: toConnectId }),
      user.updateOne({ _id: userId }, { $pull: { followers: toConnectId } }),
    ]);

    res.json("Removed");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/Unfollow", async (req, res) => {
  try {
    const { userId, toConnectId } = req.body;
    //inverted
    await Promise.all([
      connection.findOneAndRemove({ userId: toConnectId, requestorId: userId }),
      user.updateOne({ _id: toConnectId }, { $pull: { followers: userId } }),
    ]);

    res.json("Unfollowed");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/fetchFollowTabStatus", async (req, res) => {
  try {
    const { userId, toConnectId } = req.body;
    //inverted
    const conn = await connection.findOne({
      userId: toConnectId,
      requestorId: userId,
    });
    res.json(
      conn && conn?.status === "Accepted"
        ? "Unfollow"
        : conn && conn?.status === "Pending"
        ? "Pending"
        : "Follow"
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/fetchAcceptTabStatus", async (req, res) => {
  try {
    const { userId, toConnectId } = req.body;
    const conn = await connection.findOne({ userId, requestorId: toConnectId });
    res.json(conn?.status === "Pending" ? "Accept" : conn?.status);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/fetchRemoveTabStatus", async (req, res) => {
  try {
    const { userId, toConnectId } = req.body;
    const conn = await connection.findOne({ userId, requestorId: toConnectId });
    res.json(conn?.status === "Accepted" ? "Remove" : conn?.status);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

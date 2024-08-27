const express = require("express");
const moment = require("moment");

const user = require("../models/user");

const router = express.Router();

router.post("/sendCoinsWithinApp", async (req, res) => {
  try {
    const { senderId, recipientIds, messageData } = req.body;

    const messageCreatedAt = await moment().format();

    await user.updateMany(
      { _id: { $in: recipientIds } },
      { $push: { messages: { messageCreatedAt, senderId, messageData } } }
    );

    res.json("Coin Sent Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/fetchMessagesForUser", async (req, res) => {
  try {
    const { userId } = req.body;

    const userObject = await user
      .findById(userId, "messages")
      .populate("messages.senderId", "name userName profilePicIndex")
      .sort({ "messages.messageCreatedAt": -1 });

    res.json(userObject.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

router.post("/deleteMessage", async (req, res) => {
  try {
    const { userId, messageId } = req.body;

    await user.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageId } } }
    );

    res.json("Message Removed");
  } catch (err) {
    console.log(err);
    res.status(500).json("An error occured");
  }
});

module.exports = router;

const express = require("express");
const user = require("../models/user");
const connection = require("../models/connection");

const router = express.Router();

router.post("/FollowTabList", (req, res) => {
  user
    .find({ _id: { $ne: req.body.userId } })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/RequestsTabList", (req, res) => {
  connection
    .find({ userId: req.body.userId, status: { $ne: "Accepted" } })
    .populate("requestorId")
    .then((conn) => {
      res.json(conn);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/FollowersTabList", (req, res) => {
  connection
    .find({ userId: req.body.userId, status: "Accepted" })
    .populate("requestorId")
    .then((conn) => {
      res.json(conn);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/Follow", (req, res) => {
  const { userId, toConnectId } = req.body;
  //switching Ids
  const newConnect = new connection({
    userId: toConnectId,
    requestorId: userId,
    status: "Pending",
  });
  newConnect
    .save()
    .then(() => {
      res.json("Pending");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("An error occured");
    });
});

router.post("/Accept", (req, res) => {
  const { userId, toConnectId } = req.body;
  connection
    .findOneAndUpdate(
      { userId, requestorId: toConnectId },
      { status: "Accepted" }
    )
    .then(() => {
      user
        .updateOne({ _id: userId }, { $push: { followers: toConnectId } })
        .then(() => {
          res.json("Accepted");
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

router.post("/Remove", (req, res) => {
  const { userId, toConnectId } = req.body;
  connection
    .findOneAndRemove({ userId, requestorId: toConnectId })
    .then(() => {
      user
        .updateOne({ _id: userId }, { $pull: { followers: toConnectId } })
        .then(() => {
          res.json("Removed");
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

router.post("/fetchFollowTabStatus", (req, res) => {
  const { userId, toConnectId } = req.body;
  //inverted
  connection
    .findOne({ userId: toConnectId, requestorId: userId })
    .then((conn) => {
      console.log(conn);
      res.json(conn?.status || "Follow");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/fetchAcceptTabStatus", (req, res) => {
  const { userId, toConnectId } = req.body;
  connection
    .findOne({ userId, requestorId: toConnectId })
    .then((conn) => {
      console.log(conn);
      res.json(conn?.status === "Pending" ? "Accept" : conn?.status);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/fetchRemoveTabStatus", (req, res) => {
  const { userId, toConnectId } = req.body;
  connection
    .findOne({ userId, requestorId: toConnectId })
    .then((conn) => {
      console.log(conn);
      res.json(conn?.status === "Accepted" ? "Remove" : conn?.status);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete user
// router.post("/deleteUser", (req, res) => {
//   file
//     .deleteMany({ userId: req.body.id })
//     .then((f) => {
//       user.findByIdAndRemove(req.body.id).then((u) => {
//         res.json(f);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json("An error occured");
//     });
// });

module.exports = router;

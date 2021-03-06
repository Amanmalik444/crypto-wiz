const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favouriteCoins: {
      type: [String],
      required: false,
    },
    followers: {
      type: [String],
      required: false,
    },
    profilePicIndex: {
      type: String,
      required: false,
    },
    messages: {
      type: [
        {
          messageCreatedAt: Date,
          senderId: String,
          messageData: {
            shareNote: String,
            coinId: String,
            coinName: String,
          },
        },
      ],
      required: false,
      timestamps: true,
    },
  },
  { timestamps: true }
);

//hashing middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

module.exports = mongoose.model("user", userSchema);

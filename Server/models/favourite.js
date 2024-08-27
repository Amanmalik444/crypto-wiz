const mongoose = require("mongoose");

const schema = mongoose.Schema;

const favouriteSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    favId: {
      type: String,
      required: true,
    },
    cardData: {
      type: schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("favourite", favouriteSchema);

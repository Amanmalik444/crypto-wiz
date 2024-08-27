const mongoose = require("mongoose");

const schema = mongoose.Schema;

const connectionSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    requestorId: { type: schema.Types.ObjectId, ref: "user", required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notifications", connectionSchema);

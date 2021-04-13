const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    song: { type: Schema.Types.ObjectId, ref: "Song" },
    playing: { type: Number, default: 0 },
    like: { type: Boolean, default: false },
    comment: { type: String },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Interaction", interactionSchema);

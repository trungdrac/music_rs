const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    song: { type: Schema.Types.ObjectId, ref: "Song", required: true },
    playing: { type: Number, default: 0 },
    like: { type: Boolean, default: false },
    comment: { type: String },
  },
  { timestamps: true }
);

interactionSchema.index({ user: 1, song: 1 }, { unique: true });

module.exports = mongoose.model("Interaction", interactionSchema);

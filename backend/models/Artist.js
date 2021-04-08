const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    song: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamp: true }
);

artistSchema.index({ name: "text" });

module.exports = mongoose.model("Artist", artistSchema);

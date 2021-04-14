const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    title: { type: String, required: true },
    song: [{ type: Schema.Types.ObjectId, ref: "Song", required: true }],
    own: { type: Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String, required: true },
    area: { type: Schema.Types.ObjectId, ref: "Area" },
  },
  { timestamp: true }
);

playlistSchema.index({ title: "text" });

module.exports = mongoose.model("Playlist", playlistSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    title: { type: String, required: true },
    song: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    own: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: process.env.MUSICRS_ID,
    },
    image: { type: String, required: true },
    area: { type: Schema.Types.ObjectId, ref: "Area" },
  },
  { timestamps: true }
);

playlistSchema.index({ title: "text" });

module.exports = mongoose.model("Playlist", playlistSchema);

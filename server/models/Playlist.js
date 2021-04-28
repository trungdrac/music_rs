const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    title: { type: String, required: true },
    song: [{ type: Schema.Types.ObjectId, ref: "Song", required: true }],
    own: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: "607eb77ffa10cb50bdeac678",
    },
    image: { type: String, default: "/images/song-image-default/default.jpg" },
    area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
  },
  { timestamps: true }
);

playlistSchema.index({ title: "text" });

module.exports = mongoose.model("Playlist", playlistSchema);

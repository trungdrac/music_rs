const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Playlist = new Schema(
  {
    title: { type: String },
    artist: { type: String },
    image: { type: String },
    songs: { type: Array },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Song", Song);

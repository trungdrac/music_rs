const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Song = new Schema(
  {
    title: { type: String },
    artist: { type: String },
    path: { type: String },
    image: { type: String },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Song", Song);

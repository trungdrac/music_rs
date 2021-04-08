const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: { type: String, required: true},
    artist: [{type: Schema.Types.ObjectId, ref: "Artist"}],
    category: [{type: Schema.Types.ObjectId, ref: "Category"}],
    area: {type: Schema.Types.ObjectId, ref: "Area"},
    image: { type: String, required: true},
    url: { type: String, required: true},
    lyrics: { type: String},
  },
  { timestamp: true }
);

songSchema.index({ title: "text" });

module.exports = mongoose.model("Song", songSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: [{ type: Schema.Types.ObjectId, ref: "Artist", required: true }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    lyrics: { type: String },
    playing: { type: Number, default: 0 },
    prevcount: { type: Number, default: 0 },
    chartcount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

songSchema.index({ title: "text" });

module.exports = mongoose.model("Song", songSchema);

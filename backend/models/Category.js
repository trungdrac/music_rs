const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    song: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Category", categorySchema);

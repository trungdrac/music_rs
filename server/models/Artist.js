const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
  },
  { timestamps: true }
);

artistSchema.index({ name: "text" });

module.exports = mongoose.model("Artist", artistSchema);

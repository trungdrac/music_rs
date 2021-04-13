const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const areaSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Area", areaSchema);

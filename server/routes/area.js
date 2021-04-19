const express = require("express");
const router = express.Router();

const Area = require("../models/Area");
require("../models/Category");

// [GET] /area
router.get("/", (req, res, next) => {
  Area.find({})
  .populate({ path: "category"})
  .exec((err, areas) => {
    if (err) {
      next;
    } else {
      res.json(areas);
    }
  });
});

module.exports = router;

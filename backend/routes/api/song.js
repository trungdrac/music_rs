const express = require("express");
const router = express.Router();

const Song = require("../../models/Song");
require("../../models/Artist");
require("../../models/Category");

// [GET] /song
router.get("/", (req, res, next) => {
  Song.find({})
    .populate({ path: "artist", select: "name" })
    .populate({ path: "category", select: "name" })
    .exec((err, song) => {
      if (err) {
        console.log(err);
      } else {
        res.send(song);
      }
    });
});

module.exports = router;

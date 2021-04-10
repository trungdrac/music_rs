const express = require("express");
const router = express.Router();

const Song = require("../../models/Song");
require("../../models/Artist");
require("../../models/Category");
require("../../models/Area");

// [GET] /song
router.get("/", (req, res, next) => {
  Song.find({})
    .populate({ path: "artist", select: "name" })
    .populate({ path: "category", select: "name" })
    .populate({ path: "area", select: "name" })
    .exec((err, songs) => {
      if (err) {
        next;
      } else {
        res.send(songs);
      }
    });
});

// [GET] /song/:id
router.get("/:id", (req, res, next) => {
  const songId = req.params.id;
  Song.findById(songId)
    .populate({ path: "artist", select: "name" })
    .populate({ path: "category", select: "name" })
    .populate({ path: "area", select: "name" })
    .exec((err, song) => {
      if (err) {
        next;
      } else {
        res.send(song);
      }
    });
});

module.exports = router;

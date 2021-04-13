const express = require("express");
const router = express.Router();

const Song = require("../../models/Song");
require("../../models/Artist");
require("../../models/Category");
require("../../models/Area");

// [GET] /song
router.get("/", (req, res, next) => {
  Song.find({}, "-lyrics")
    .populate({ path: "artist", select: "name" })
    .populate({ path: "category"})
    .populate({ path: "area"})
    .exec((err, songs) => {
      if (err) {
        next;
      } else {
        res.json(songs);
      }
    });
});

// [GET] /song/:id
router.get("/:id", (req, res, next) => {
  const songId = req.params.id;
  Song.findById(songId)
    .populate({ path: "artist", select: "name" })
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "area", select: "name -_id" })
    .exec((err, song) => {
      if (err) {
        next;
      } else {
        res.json(song);
      }
    });
});

module.exports = router;

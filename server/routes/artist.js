var mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Artist = require("../models/Artist");
const Song = require("../models/Song");
require("../models/Area");

// [GET] /artist
router.get("/", (req, res, next) => {
  Artist.find({})
    .then((artists) => res.json(artists))
    .catch(next);
});

// [GET] /artist/detail/:id
router.get("/detail/:id", (req, res, next) => {
  const artistId = req.params.id;
  const artistPromise = Artist.findById(artistId)
    .populate({ path: "area" })
    .exec();
  const songPromise = Song.find(
    {
      artist: mongoose.Types.ObjectId(artistId),
    },
    "-lyrics"
  ).exec();
  Promise.all([artistPromise, songPromise])
    .then((artistDetail) => res.json(artistDetail))
    .catch(next);
});

module.exports = router;

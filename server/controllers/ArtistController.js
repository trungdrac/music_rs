const mongoose = require("mongoose");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
require("../models/Area");

class ArtistController {
  // [GET] /artist
  getAll = (req, res, next) => {
    Artist.find({})
      .then((artists) => res.json(artists))
      .catch(next);
  };

  // [GET] /artist/detail/:id
  getDetail = (req, res, next) => {
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
  };
}

module.exports = new ArtistController();

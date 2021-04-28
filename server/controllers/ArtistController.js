const mongoose = require("mongoose");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
require("../models/Area");

class ArtistController {
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

  // [GET] /artist/:area/
  getArtistArea = (req, res, next) => {
    const areaId = req.params.area;
    Artist.find({ area: areaId }, "name image")
      .sort({ _id: 1 })
      .limit(24)
      .exec((err, artists) => {
        if (err) {
          next;
        } else {
          res.json(artists);  
        }
      });
  };
}

module.exports = new ArtistController();

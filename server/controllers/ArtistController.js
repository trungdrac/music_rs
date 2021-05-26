const mongoose = require("mongoose");
const {
  NUMBER_OF_ITEM_PER_PAGE,
} = require("../../client/src/constants/Config");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
require("../models/Area");

class ArtistController {
  // [GET] /artist/detail/:id
  getDetail = (req, res, next) => {
    const artistId = req.params.id;
    const artistPromise = Artist.findById(artistId, "name image area")
      .populate({ path: "area", select: "name" })
      .exec();
    const songPromise = Song.find(
      {
        artist: mongoose.Types.ObjectId(artistId),
      },
      "title image url artist"
    )
      .populate({ path: "artist", select: "name" })
      .sort({ createdAt: -1 })
      .limit(24)
      .exec();
    Promise.all([artistPromise, songPromise])
      .then((artistDetail) => res.json(artistDetail))
      .catch(next);
  };

  // [GET] /artist/:area?page=
  getArtistArea = (req, res, next) => {
    const { page } = req.query;
    const areaId = req.params.area;
    Artist.find({ area: areaId }, "name image")
      .sort({ _id: 1 })
      .skip(NUMBER_OF_ITEM_PER_PAGE * (page - 1))
      .limit(NUMBER_OF_ITEM_PER_PAGE)
      .then((artists) => res.json(artists))
      .catch(next);
  };

  // [GET] /artist/:area/count
  countArtistArea = (req, res, next) => {
    const areaId = req.params.area;
    Artist.countDocuments({ area: areaId })
      .then((count) => res.json(count))
      .catch(next);
  };
}

module.exports = new ArtistController();

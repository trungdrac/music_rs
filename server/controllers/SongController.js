const {
  NUMBER_OF_ITEM_PER_PAGE,
} = require("../../client/src/constants/Config");
const Song = require("../models/Song");
require("../models/Artist");
require("../models/Category");
require("../models/Area");

class SongController {
  // [GET] /song
  getAll = (req, res, next) => {
    Song.find({}, "title artist image url")
      .populate({ path: "artist", select: "name" })
      .limit(NUMBER_OF_ITEM_PER_PAGE)
      .then((songs) => res.json(songs))
      .catch((error) => res.json({ message: error }));
  };

  // [GET] /song/detail/:id
  getDetail = (req, res, next) => {
    const songId = req.params.id;
    Song.findById(songId)
      .populate({ path: "artist", select: "name" })
      .populate({ path: "category", select: "name -_id" })
      .populate({ path: "area", select: "name -_id" })
      .then((song) => res.json(song))
      .catch((error) => res.json({ message: error }));
  };

  // [GET] /song/:area/:category
  getSongCategory = (req, res, next) => {
    const { page } = req.query;
    const categoryId = req.params.category;
    Song.find({ category: categoryId }, "title artist image url")
      .populate({ path: "artist", select: "name" })
      .sort({ _id: 1 })
      .skip(NUMBER_OF_ITEM_PER_PAGE * (page - 1))
      .limit(NUMBER_OF_ITEM_PER_PAGE)
      .then((songs) => res.json(songs))
      .catch((error) => res.json({ message: error }));
  };

  // [GET] /song/:area/:category/count
  countSongCategory = (req, res, next) => {
    const categoryId = req.params.category;
    Song.countDocuments({ category: categoryId })
      .then((count) => res.json(count))
      .catch((error) => res.json({ message: error }));
  };
}

module.exports = new SongController();

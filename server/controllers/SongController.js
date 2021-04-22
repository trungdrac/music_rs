const Song = require("../models/Song");
require("../models/Artist");
require("../models/Category");
require("../models/Area");

class SongController {
  // [GET] /song
  getAll = (req, res, next) => {
    Song.find({}, "title artist image url")
      .populate({ path: "artist", select: "name" })
      .limit(12)
      .exec((err, songs) => {
        if (err) {
          next;
        } else {
          res.json(songs);
        }
      });
  };

  // [GET] /song/detail/:id
  getDetail = (req, res, next) => {
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
  };

  // [GET] /song/:area/:category
  getSongCategory = (req, res, next) => {
    const categoryId = req.params.category;
    Song.find({ category: categoryId }, "title artist image url")
      .populate({ path: "artist", select: "name" })
      .sort({ _id: 1 })
      .limit(24)
      .exec((err, songs) => {
        if (err) {
          next;
        } else {
          res.json(songs);
        }
      });
  };
}

module.exports = new SongController();

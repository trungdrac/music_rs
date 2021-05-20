const {
  NUMBER_OF_ITEM_PER_PAGE,
} = require("../../client/src/constants/Config");
const Song = require("../models/Song");
require("../models/Artist");
const Area = require("../models/Area");
const Category = require("../models/Category");

class SongController {
  // [GET] /song/detail/:id
  getDetail = (req, res, next) => {
    const songId = req.params.id;
    Song.findById(songId)
      .populate({ path: "artist", select: "name" })
      .populate({ path: "category", select: "name -_id" })
      .then((song) => res.json(song))
      .catch(next);
  };

  // [GET] /song/:area/:category?page=
  getSongCategory = (req, res, next) => {
    const { page } = req.query;
    const categoryId = req.params.category;
    Song.find({ category: categoryId }, "title artist image url")
      .populate({ path: "artist", select: "name" })
      .sort({ _id: 1 })
      .skip(NUMBER_OF_ITEM_PER_PAGE * (page - 1))
      .limit(NUMBER_OF_ITEM_PER_PAGE)
      .then((songs) => res.json(songs))
      .catch(next);
  };

  // [GET] /song/:area/:category/count
  countSongCategory = (req, res, next) => {
    const categoryId = req.params.category;
    Song.countDocuments({ category: categoryId })
      .then((count) => res.json(count))
      .catch(next);
  };

  // [PUT] /song/:id/playing/update
  updatePlaying = (req, res, next) => {
    const songId = req.params.id;
    Song.findById(songId)
      .then((result) => {
        result.playing++;
        result
          .save()
          .then((newResult) => res.json(newResult.playing))
          .catch(next);
      })
      .catch(next);
  };

  chart = (req, res, next) => {
    const vPromise = Area.findById("607e43c2de9235255b4520fe").exec();
    const uPromise = Area.findById("607e43f3ca4c90259e738e3d").exec();
    Promise.all([vPromise, uPromise])
      .then((result) => {
        const vCategory = result[0].category;
        const uCategory = result[1].category;
        const kCategory = "607e437e9d94f224bfdb57f2";

        const vCount = Song.find(
          { category: { $in: vCategory } },
          "title artist image url chartcount"
        )
          .populate({ path: "artist", select: "name" })
          .sort({ chartcount: -1 })
          .limit(10)
          .exec();

        const uCount = Song.find(
          { category: { $in: uCategory } },
          "title artist image url chartcount"
        )
          .populate({ path: "artist", select: "name" })
          .sort({ chartcount: -1 })
          .limit(10)
          .exec();

        const kCount = Song.find(
          { category: kCategory },
          "title artist image url chartcount"
        )
          .populate({ path: "artist", select: "name" })
          .sort({ chartcount: -1 })
          .limit(10)
          .exec();

        Promise.all([vCount, uCount, kCount])
          .then((charts) => res.json(charts))
          .catch(next);
      })
      .catch(next);
  };
}

module.exports = new SongController();

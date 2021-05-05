const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const Artist = require("../models/Artist");
const {
  NUMBER_OF_ITEM_PER_PAGE,
} = require("../../client/src/constants/Config");

class SearchController {
  // [GET] /search
  suggest = (req, res, next) => {
    const { q } = req.query;
    const songPromise = Song.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } },
      { select: "title image" }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(4)
      .exec();
    const playlistPromise = Playlist.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } },
      { select: "title image" }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(4)
      .exec();
    const artistPromise = Artist.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } },
      { select: "name image" }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(4)
      .exec();
    Promise.all([songPromise, playlistPromise, artistPromise])
      .then((suggestion) => res.json(suggestion))
      .catch((error) => res.json({ message: error }));
  };

  // [GET] /search/:type?q=&page=
  search = (req, res, next) => {
    const { q, page } = req.query;
    const { type } = req.params;
    if (type === "song") {
      Song.find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" } },
        { select: "title image artist url" }
      )
        .populate({ path: "artist", select: "name" })
        .sort({ score: { $meta: "textScore" } })
        .skip(NUMBER_OF_ITEM_PER_PAGE * (page - 1))
        .limit(NUMBER_OF_ITEM_PER_PAGE)
        .then((result) => res.json(result))
        .catch((error) => res.json({ message: error }));
    }
    if (type === "playlist") {
      Playlist.find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" } },
        { select: "title image song" }
      )
        .populate({
          path: "song",
          select: "title artist image url",
          populate: {
            path: "artist",
            select: "name",
          },
        })
        .sort({ score: { $meta: "textScore" } })
        .skip(NUMBER_OF_ITEM_PER_PAGE * (page - 1))
        .limit(NUMBER_OF_ITEM_PER_PAGE)
        .then((result) => res.json(result))
        .catch((error) => res.json({ message: error }));
    }
    if (type === "artist") {
      Artist.find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" } },
        { select: "name image" }
      )
        .sort({ score: { $meta: "textScore" } })
        .skip(NUMBER_OF_ITEM_PER_PAGE * (page - 1))
        .limit(NUMBER_OF_ITEM_PER_PAGE)
        .then((result) => res.json(result))
        .catch((error) => res.json({ message: error }));
    }
  };

  // [GET] /search/count/:type?q=
  count = (req, res, next) => {
    const { q } = req.query;
    const { type } = req.params;
    if (type === "song") {
      Song.countDocuments({ $text: { $search: q } })
        .then((count) => res.json(count))
        .catch((error) => res.json({ message: error }));
    }
    if (type === "playlist") {
      Playlist.countDocuments({ $text: { $search: q } })
        .then((count) => res.json(count))
        .catch((error) => res.json({ message: error }));
    }
    if (type === "artist") {
      Artist.countDocuments({ $text: { $search: q } })
        .then((count) => res.json(count))
        .catch((error) => res.json({ message: error }));
    }
  };
}

module.exports = new SearchController();

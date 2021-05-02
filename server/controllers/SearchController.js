const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const Artist = require("../models/Artist");

class SearchController {
  // [POST] /search
  search = (req, res, next) => {
    const { text } = req.body;
    const songPromise = Song.find(
      { $text: { $search: text } },
      { score: { $meta: "textScore" } },
      { select: "title image" }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(4)
      .exec();
    const playlistPromise = Playlist.find(
      { $text: { $search: text } },
      { score: { $meta: "textScore" } },
      { select: "title image" }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(4)
      .exec();
    const artistPromise = Artist.find(
      { $text: { $search: text } },
      { score: { $meta: "textScore" } },
      { select: "name image" }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(4)
      .exec();
    Promise.all([songPromise, playlistPromise, artistPromise])
      .then((suggestion) => res.json(suggestion))
      .catch(next);
  };
}

module.exports = new SearchController();

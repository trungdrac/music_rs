const mongoose = require("mongoose");
const {
  NUMBER_OF_ITEM_PER_PAGE,
} = require("../../client/src/constants/Config");
const Playlist = require("../models/Playlist");
require("../models/Song");
require("../models/User");
require("../models/Artist");

class PlaylistController {
  //[GET] /playlist/detail/:id
  getDetail = (req, res, next) => {
    const playlistId = req.params.id;
    Playlist.findById(playlistId, "title image song own area")
      .populate({
        path: "song",
        select: "title artist image url",
        populate: {
          path: "artist",
          select: "name",
        },
      })
      .populate({ path: "own", select: "username" })
      .populate({ path: "area", select: "name" })
      .then((playlist) => res.json(playlist))
      .catch(next);
  };

  // [GET] /playlist/:area?page=
  getPlaylistArea = (req, res, next) => {
    const { page } = req.query;
    const areaId = req.params.area;
    Playlist.find(
      { area: areaId, own: mongoose.Types.ObjectId(process.env.MUSICRS_ID) },
      "title image song"
    )
      .populate({
        path: "song",
        select: "title artist image url",
        populate: {
          path: "artist",
          select: "name",
        },
      })
      .sort({ _id: 1 })
      .skip(NUMBER_OF_ITEM_PER_PAGE * (page - 1))
      .limit(NUMBER_OF_ITEM_PER_PAGE)
      .then((playlists) => res.json(playlists))
      .catch(next);
  };

  // [GET] /playlist/:area/count
  countPlaylistArea = (req, res, next) => {
    const areaId = req.params.area;
    Playlist.countDocuments({
      area: areaId,
      own: mongoose.Types.ObjectId(process.env.MUSICRS_ID),
    })
      .then((count) => res.json(count))
      .catch(next);
  };
}

module.exports = new PlaylistController();
